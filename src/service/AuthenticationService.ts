import {Request, Response} from "express";
import * as jwt from 'jsonwebtoken';

import dotenv from "dotenv";
import TokenCreation from "../util/tokenCreation";
import {User} from "../entity/User";

dotenv.config();

class AuthenticationService {
    private refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET

    constructor() {

    }

    public refreshToken =  async (req: Request, res: Response) => {
        try {
            const refreshToken = req.body.refreshToken

            jwt.verify(refreshToken, this.refreshTokenSecret,
                (err: any, decoded: any) => {
                    if (err) {
                        return res.status(406).json({ message: 'Unauthorized' });
                    }

                    const user = new User();
                    user.username = decoded.username
                    user.UUID = decoded.uuid
                    const payload = TokenCreation.createUserPayload(user)
                    const accessToken = TokenCreation.createAccessToken(payload)
                    return res.status(200).json({ "accessToken": accessToken });
                })

        } catch (error) {
            return res.status(500).send()
        }
    }
}

export default AuthenticationService
