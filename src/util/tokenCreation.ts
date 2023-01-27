import * as jwt from 'jsonwebtoken';
import {User} from "../entity/User";
import dotenv from "dotenv";

dotenv.config();

class TokenCreation {
    private static accessTokenSecret =  process.env.ACCESS_TOKEN_SECRET
    private static refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET

    private static refreshTokenLife = process.env.REFRESH_TOKEN_LIFE
    private static accessTokenLife = process.env.ACCESS_TOKEN_LIFE

    public static createUserPayload(user: User): object{
        return {
            uuid: user.UUID,
            username: user.username
        }
    }

    public static createAccessToken(payload: {}) {
        return jwt.sign(payload, this.accessTokenSecret, {
            "algorithm": "HS256",
            "expiresIn": this.accessTokenLife
        });
    }

    public static createRefreshToken(payload: {}){
        return jwt.sign(payload, this.refreshTokenSecret, {
            "algorithm": "HS256",
            "expiresIn": this.refreshTokenLife
        });
    }

}

export default TokenCreation
