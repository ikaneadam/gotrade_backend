import {Request, Response} from "express";
import ProductDAO from "../dao/ProductDAO";
import BuildPaginationOptionsFromQueryParameters from "../util/pagination/BuildPaginationOptionsFromQueryParameters";
import {PaginationOptions} from "../util/pagination/pagination.options";
import validator from "validator";
import isUUID = validator.isUUID;
import UserFromTokenExtractor from "../util/UserFromTokenExtractor";
import * as joi from "joi";
import {User} from "../entity/User";

class ProductService {
    private readonly doa: ProductDAO;
    private readonly tokenExtractor: UserFromTokenExtractor;

    constructor() {
        this.doa = new ProductDAO()
        this.tokenExtractor = new UserFromTokenExtractor()
    }

    public getProduct =  async (req: Request, res: Response) => {
        if(req.params.id === undefined){
            await this.getProducts(req, res)
        } else{
            await this.getSingleProduct(req, res)
        }
    }

    private getSingleProduct =  async (req: Request, res: Response) => {
        try{
            const productUUID = String(req.params.id)
            if(!isUUID(productUUID)){
                return res.status(404).send()
            }

            if (!await this.doa.doesProductExist(productUUID)){
                return res.status(404).send()
            }
            const product = await this.doa.getProduct(req.params.id)
            return res.status(200).send(product)
        }catch (e){
            return res.status(500).send()
        }
    }

    private getProducts =  async (req: Request, res: Response) => {
        try{
            const paginationOptions: PaginationOptions = await BuildPaginationOptionsFromQueryParameters.buildPaginationOptionsFromQueryParameters(req);
            const products = (await this.doa.getProductsPaginated(paginationOptions))
            return res.status(200).send(products)
        }catch (e){
            return res.status(500).send()
        }
    }

    private postProductSchema = joi.object({
        name: joi.string().min(5).required(),
        description: joi.string().min(0).required(),
        price: joi.number().greater(0).required()
    })

    public  postProduct =  async (req: Request, res: Response) => {
        const { error } = this.postProductSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        try {
            const user: User = await this.tokenExtractor.getUserFromToken(req)
            const files = req.files
            if (files === undefined || !Array.isArray(files)) {
                return res.status(400).send('Please choose files')
            }

            const fileNames = files.map(x => x.filename);
            const product = await this.doa.createProduct(req.body.name, req.body.description, req.body.price, fileNames, user)
            console.log(product)
            return res.status(200).send(product)
        } catch (error) {
            console.log(error)
            return res.status(500).send()
        }
    }

    public putProduct =  async (req: Request, res: Response) => {
        try {

        } catch (error) {
            return res.status(500).send()
        }
    }

    public deleteProduct =  async (req: Request, res: Response) => {
        try {

        } catch (error) {
            return res.status(500).send()
        }
    }

    public addOfferToProduct =  async (req: Request, res: Response) => {
        try {

        } catch (error) {
            return res.status(500).send()
        }
    }

    public deleteOfferFromProduct =  async (req: Request, res: Response) => {
        try {

        } catch (error) {
            return res.status(500).send()
        }
    }

    public updateOffer =  async (req: Request, res: Response) => {
        try {

        } catch (error) {
            return res.status(500).send()
        }
    }
}

export default ProductService
