import * as express from 'express'
import CategoryService from "../service/CategoryService";

class CategoryController {
    public path = '/api/review/:id?'
    public router = express.Router()
    private service = new CategoryService()

    constructor() {
        this.routes()
    }

    public routes(){

    }
}


export default CategoryController
