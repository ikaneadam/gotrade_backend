import * as jwt from 'jsonwebtoken'
import {Request, Response} from "express";
import dotenv from "dotenv";

dotenv.config();

const accessTokenSecret =  process.env.ACCESS_TOKEN_SECRET

let tokenVerification = (req: Request, res: Response, next: () => void) => {
    let accessToken = req.header("Authorization")

    if (!accessToken) {
        return res.status(403).send()
    }

    let payload
    try{
        payload = jwt.verify(accessToken, accessTokenSecret)
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