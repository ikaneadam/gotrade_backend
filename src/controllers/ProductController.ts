import * as express from 'express'
import ProductService from "../service/ProductService";
import authChecker from "../middleware/authChecker";

class ProductController {
    public path = '/api/products/:id?'
    public router = express.Router()
    private service = new ProductService()

    constructor() {
        this.routes()
    }

    public routes(){
        this.router.get(this.path, this.service.getProduct)
        this.router.use(authChecker)
        this.router.post(this.path, this.service.postProduct)
        this.router.put(this.path, this.service.putProduct)
        this.router.delete(this.path, this.service.deleteProduct)

        this.router.post(this.path + "/offer", this.service.addOfferToProduct)
        this.router.put(this.path + "/offer/:offerId", this.service.updateOffer)
        this.router.delete(this.path + "/offer/:offerId", this.service.deleteOfferFromProduct)
    }
}


export default ProductController
