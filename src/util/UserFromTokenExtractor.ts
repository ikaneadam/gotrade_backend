import {Request} from "express";
import {User} from "../entity/User";
import UserDAO from "../dao/UserDAO";
import * as jwt from 'jsonwebtoken'

class UserFromTokenExtractor {
    private userDAO: UserDAO;
    private accessTokenSecret =  process.env.ACCESS_TOKEN_SECRET

    constructor() {
        this.userDAO = new UserDAO();
    }


    public async getUserFromToken(req: Request): Promise<User> {
        const accessToken = req.header("Authorization")
        if (accessToken == null) {
            return
        }
        try {
            const decodedToken = jwt.verify(accessToken, this.accessTokenSecret);
            const payload = Object(decodedToken)
            return await this.userDAO.getUserByUUID(payload.uuid)
        }

        catch(e){
            return
        }
    }
}

export default UserFromTokenExtractor
