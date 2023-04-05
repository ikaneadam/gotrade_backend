import * as express from 'express'
import ProfileService from "../service/ProfileService";
import fileUpload from "../middleware/fileUpload";
import authChecker from "../middleware/authChecker";

class ProfileController {
    public path = '/api/profile/:id?'
    public router = express.Router()
    private service = new ProfileService()

    constructor() {
        this.routes()
    }

    public routes(){
        this.router.get(this.path, this.service.getProfile)
        this.router.use(authChecker)
        this.router.post(this.path, fileUpload.single("profile"), this.service.postProfile)
        this.router.put(this.path, fileUpload.single("profile"), this.service.putProfile)
    }
}


export default ProfileController
