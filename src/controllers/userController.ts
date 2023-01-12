import * as express from 'express'
import UserService from "../service/userService"

class UserController {
    public pathLogin = '/api/user/login'
    public pathRegister = '/api/user/register'
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
