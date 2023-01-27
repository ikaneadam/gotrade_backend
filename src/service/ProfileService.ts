import ProfileDAO from "../dao/ProfileDAO";
import {Request, Response} from "express";
import {User} from "../entity/User";
import UserFromTokenExtractor from "../util/UserFromTokenExtractor";
import validator from "validator";
import isUUID = validator.isUUID;
import * as joi from "joi";
const joiPhoneNumber = joi.extend(require('joi-phone-number'));
const joiPostalCode = joi.extend(require('joi-postalcode'))

class ProfileService {
    private readonly doa: ProfileDAO;
    private readonly tokenExtractor: UserFromTokenExtractor;

    constructor() {
        this.doa = new ProfileDAO()
        this.tokenExtractor = new UserFromTokenExtractor()
    }

    private async handleNonExistingProfile(userUUID: string, res: Response){
        if (!isUUID(userUUID)) {
            res.status(404).send()
        }

        if (!await this.doa.doesProfileExist(userUUID)){
            res.status(404).send()
        }
    }

    private async verifyThatUserOwnsProfile(userSendingRequest:User, profileUserUUID: string, res: Response){
        if (!(userSendingRequest.UUID === profileUserUUID)){
            res.status(400).send()
        }
    }

    public getProfile =  async (req: Request, res: Response) => {
        try {
            const userUUID = String(req.params.id)
            await this.handleNonExistingProfile(userUUID, res)
            const profile = await this.doa.getProfile(userUUID)
            return res.status(200).send(profile)
        } catch (error) {
            return res.status(500).send()
        }
    }

    private profileSchema = joi.object({
        email: joi.string().min(3).required().email(),
        phoneNumber: joiPhoneNumber.string().phoneNumber({defaultCountry: "nl"}).required(),
        address: joi.object().required().keys({
            postalCode: joiPostalCode.string().postalCode('nl').required(),
            houseNumber: joi.number().positive().required()
        })
    })

    public postProfile =  async (req: Request, res: Response) => {
        const { error } = this.profileSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        try {
            const user: User = await this.tokenExtractor.getUserFromToken(req)
            const doesUserAlreadyHaveAProfile = await this.doa.doesProfileExist(user.UUID)
            const file = req.file

            if (doesUserAlreadyHaveAProfile){
                return res.status(400).send('user already has a profile')
            }

            if (file === undefined) {
                return res.status(400).send('Please choose file')
            }

            const profile = await this.doa.createProfile(user, req.body.address.houseNumber, req.body.address.postalCode, req.body.email, req.body.phoneNumber, req.file.filename)
            return res.status(200).send(profile)
        } catch (error) {
            return res.status(500).send()
        }
    }

    public putProfile =  async (req: Request, res: Response) => {
        const { error } = this.profileSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        try {
            const userUUID = String(req.params.id)
            const user: User = await this.tokenExtractor.getUserFromToken(req)
            await this.handleNonExistingProfile(userUUID, res)
            await this.verifyThatUserOwnsProfile(user, userUUID, res)
            const file = req.file

            if (file === undefined) {
                return res.status(400).send('Please choose file')
            }

            const profile = await this.doa.updateProfile(user.UUID, req.body.address.houseNumber, req.body.address.postalCode, req.body.email, req.body.phoneNumber, req.file.filename)
            return res.status(200).send(profile)
        } catch (error) {
            console.log(error)
            return res.status(500).send()
        }
    }
}

export default ProfileService
