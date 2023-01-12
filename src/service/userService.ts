import {Request, Response} from "express";
import * as joi from "joi";
import * as bcrypt from 'bcrypt';
import UserDAO from "../dao/UserDAO";
import dotenv from "dotenv";
import TokenCreation from "../util/tokenCreation";
import passwordValidator from "password-validator";

dotenv.config();

class UserService {
    private readonly doa: UserDAO;
    private loginError = { error: "Incorrect username and/or password given" }

    constructor() {
        this.doa = new UserDAO()

    }

    private passwordSchema = new passwordValidator().is().min(8, "minimum 8 chars long")
        .is().max(100, "maximum 100 chars long")
        .has().uppercase(1, 'should have a minimum of 1 uppercase letter')
        .has().digits(1, "should contain atleast one number")
        .has().not().spaces();

    private loginSchema = joi.object({
        username: joi.string().min(3).required(),
        password: joi.string().min(8).required()
    })

    private registerSchema = joi.object({
        username: joi.string().min(3).required(),
        password: joi.string().min(8).required()
    })


    public loginUser =  async (req: Request, res: Response) => {
        const { error } = this.loginSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        try {
            if (!await this.doa.doesUserExist(req.body.username)) {
                return res.status(401).send(this.loginError)
            }

            const user = await this.doa.getUserByName(req.body.username)

            //compare password from db with password from the request
            if (!bcrypt.compareSync(req.body.password,user.password)) {
                return res.status(401).send(this.loginError)
            }

            const payload = TokenCreation.createUserPayload(user)
            const accessToken = TokenCreation.createAccessToken(payload)
            const refreshToken = TokenCreation.createRefreshToken(payload)

            return res.status(200).send({
                jwt: accessToken,
                refreshToken: refreshToken
            });
        } catch (error) {
            res.status(500);
        }
    }

    public registerUser =  async (req: Request, res: Response) => {
        const { error } = this.registerSchema.validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        try {
            if (await this.doa.doesUserExist(req.body.username)){
                return res.status(400).send({error: "user already exist"})
            }

            if(!this.isPasswordValid(req.body.password).isValid){
                return res.status(400).send({error: this.isPasswordValid(req.body.password).validationMessage})
            }

            const encryptedPassword = await this.encryptPassword(req.body.password)
            await this.doa.saveUser(req.body.username, encryptedPassword);

            res.status(200).send()
        } catch (error) {
            res.status(500);
        }
    }

    private async encryptPassword(password: string) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    private isPasswordValid(password: string) {
        // @ts-ignore
        // typescripts thinks validator can be boolean, but that's only the case if details = false.
        const validator: any[] = this.passwordSchema.validate(password, { details: true });

        if (validator.length === 0) {
            return {isValid: true, validationMessage: ""}
        }

        return {isValid: false, validationMessage: validator[0]["message"]}
    }
}

export default UserService
