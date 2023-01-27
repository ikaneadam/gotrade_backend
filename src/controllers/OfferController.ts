import * as express from 'express'
import OfferService from "../service/OfferService";

class OfferController {
    public path = '/api/offers/:id?'
    public router = express.Router()
    private service = new OfferService()

    constructor() {
        this.routes()
    }

    public routes(){
        this.router.put(this.path, this.service.updateOffer)
        this.router.delete(this.path, this.service.deleteOffer)
    }
}


export default OfferController
