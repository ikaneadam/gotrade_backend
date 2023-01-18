import * as express from 'express'
import ProductService from "../service/ProductService";
import authChecker from "../middleware/authChecker";
import fileUpload from "../middleware/fileUpload";

class ProductController {
    public path = '/api/products/:id?'
    public router = express.Router()
    private service = new ProductService()

    constructor() {
        this.routes()
    }

    public routes(){
        this.router.get(this.path, this.service.getProduct)
        this.router.get(this.path + "/users/:userId", this.service.getProduct)
        this.router.use(authChecker)
        this.router.post(this.path, fileUpload.array("pictures", 20), this.service.postProduct)
        this.router.put(this.path, this.service.putProduct)
        this.router.delete(this.path, this.service.deleteProduct)

        this.router.post(this.path + "/offers", this.service.addOfferToProduct)
        this.router.put(this.path + "/offers/:offerId?", this.service.updateOffer)
        this.router.delete(this.path + "/offers/:offerId?", this.service.deleteOfferFromProduct)
    }
}


export default ProductController
