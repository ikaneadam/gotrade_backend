import * as express from 'express'
import UserService from "../service/UserService"

class UserController {
    public pathLogin = '/api/users/login'
    public pathRegister = '/api/users/register'
    public router = express.Router()
    private service = new UserService()

    constructor() {
        this.routes()
    }

    public routes(){
        this.router.post(this.pathLogin, this.service.loginUser)
        this.router.post(this.pathRegister, this.service.registerUser)
    }
}


export default UserController
