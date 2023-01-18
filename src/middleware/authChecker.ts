import * as jwt from 'jsonwebtoken'
import {Request, Response} from "express";
import dotenv from "dotenv";
import UserDAO from "../dao/UserDAO";

dotenv.config();

const accessTokenSecret =  process.env.ACCESS_TOKEN_SECRET

const userDAO: UserDAO = new UserDAO();

let tokenVerification = (req: Request, res: Response, next: () => void) => {
    let accessToken = req.header("Authorization")

    if (!accessToken) {
        return res.status(403).send()
    }

    try{
        const payload = jwt.verify(accessToken, accessTokenSecret)
        const userUUID = Object(payload).uuid

        if (!userDAO.doesUserExist(userUUID)){
            res.status(401)
            res.json("user does not exist")
            return
        }

        next()
        return
    }
    catch(e: any){
        res.status(401)
        res.json(e.message)
        return
    }
}

export default tokenVerification
