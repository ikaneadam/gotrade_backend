import * as express from 'express'
import AuthenticationService from "../service/authenticationService";

class AuthenticationController {
    public pathRefreshToken = '/api/refreshToken'
    public router = express.Router()
    private service = new AuthenticationService()

    constructor() {
        this.routes()
    }

    public routes(){
        this.router.post(this.pathRefreshToken, this.service.refreshToken)
    }
}


export default AuthenticationController
