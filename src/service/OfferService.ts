import {Request, Response} from "express";
import * as joi from "joi";
import {User} from "../entity/User";
import OfferDAO from "../dao/OfferDAO";
import validator from "validator";
import isUUID = validator.isUUID;
import UserFromTokenExtractor from "../util/UserFromTokenExtractor";

class OfferService {
    private readonly doa: OfferDAO;
    private readonly tokenExtractor: UserFromTokenExtractor;

    constructor() {
        this.doa = new OfferDAO()
        this.tokenExtractor = new UserFromTokenExtractor()
    }

    private offerSchema = joi.object({
        offer: joi.number().positive().required()
    })
    private async verifyThatUserOwnsOffer(offerUUID: string, user:User, res: Response){
        if (!await this.doa.isOfferFromUser(offerUUID, user.UUID)){
            res.status(400).send()
            return false
        }

        return true
    }

    private async handleNonExistingProduct(offerUUID: string, res: Response){
        if (!isUUID(offerUUID)) {
            res.status(404).send()
            return false
        }

        if (!await this.doa.doesOfferExist(offerUUID)){
            res.status(404).send()
            return false
        }

        return true
    }


    public updateOffer =  async (req: Request, res: Response) => {
        const { error } = this.offerSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        try {
            const offerUUID = String(req.params.id)
            const user: User = await this.tokenExtractor.getUserFromToken(req)
            const doesProductExist = await this.handleNonExistingProduct(offerUUID, res)
            const doesRequestingUserOwnProduct = await this.verifyThatUserOwnsOffer(offerUUID, user, res)

            if(!doesProductExist || !doesRequestingUserOwnProduct){
                return
            }

            const offer = await this.doa.updateOffer(offerUUID, req.body.offer, user)
            return res.status(200).send(offer)
        } catch (error) {
            return res.status(500).send()
        }
    }

    public deleteOffer =  async (req: Request, res: Response) => {
        try {
            const offerUUID = String(req.params.id)
            const user: User = await this.tokenExtractor.getUserFromToken(req)
            const doesProductExist = await this.handleNonExistingProduct(offerUUID, res)
            const doesRequestingUserOwnProduct = await this.verifyThatUserOwnsOffer(offerUUID, user, res)

            if(!doesProductExist || !doesRequestingUserOwnProduct){
                return
            }

            await this.doa.deleteOffer(offerUUID, user)
            return res.status(200).send()

        } catch (error) {
            return res.status(500).send()
        }
    }

}

export default OfferService
