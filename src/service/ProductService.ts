import {Request, Response} from "express";
import ProductDAO from "../dao/ProductDAO";
import BuildPaginationOptionsFromQueryParameters from "../util/pagination/BuildPaginationOptionsFromQueryParameters";
import {PaginationOptions} from "../util/pagination/pagination.options";
import validator from "validator";
import isUUID = validator.isUUID;
import UserFromTokenExtractor from "../util/UserFromTokenExtractor";
import * as joi from "joi";
import {User} from "../entity/User";
import {ProductFilterOptions} from "../util/filters/productFilter.options";
import {CreateProductFiltersFromQueries} from "../util/filters/createProductFiltersFromQueries";

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
            const productFilterOptions: ProductFilterOptions = {user: req.query.user, category: req.query.category, minimumPrice: req.query.minimumPrice, maximumPrice: req.query.maximumPrice}
            const productFilters = CreateProductFiltersFromQueries.createFilterOptions(productFilterOptions)
            const paginationOptions: PaginationOptions = await BuildPaginationOptionsFromQueryParameters.buildPaginationOptionsFromQueryParameters(req);
            const products = await this.doa.getProducts(paginationOptions, productFilters)
            return res.status(200).send(products)
        }catch (e){
            return res.status(500).send()
        }
    }

    private attribute = joi.object().keys({
        AttributeName:joi.string().min(5).required(),
        Attribute: joi.string().min(5).required(),
    })

    private category = joi.object().keys({
        category: joi.string().min(5).required(),
    })

    private productSchema = joi.object({
        name: joi.string().min(5).required(),
        description: joi.string().min(0).required(),
        price: joi.number().greater(0).required(),
        attributes:  joi.array().items(this.attribute),
        categories:  joi.array().items(this.category)
    })

    public postProduct =  async (req: Request, res: Response) => {
        const { error } = this.productSchema.validate(req.body)
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
            const product = await this.doa.createProduct(req.body.name, req.body.description, req.body.price, fileNames, req.body.attributes, req.body.categories, user)
            return res.status(200).send(product)
        } catch (error) {
            return res.status(500).send()
        }
    }

    private async handleNonExistingProduct(productUUID: string, res: Response){
        if (!isUUID(productUUID)) {
            res.status(404).send()
            return
        }

        if (!await this.doa.doesProductExist(productUUID)){
            res.status(404).send()
            return
        }
    }

    private async verifyThatUserOwnsProduct(productUUID: string, user:User, res: Response){
        if (!await this.doa.isProductFromUser(productUUID, user.UUID)){
            res.status(400).send()
        }
    }

    public putProduct =  async (req: Request, res: Response) => {
        const { error } = this.productSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        try {
            const productUUID = String(req.params.id)
            const user: User = await this.tokenExtractor.getUserFromToken(req)
            await this.handleNonExistingProduct(productUUID, res)
            await this.verifyThatUserOwnsProduct(productUUID, user, res)
            const isActive = await this.doa.isProductActive(productUUID)

            if (!isActive){
                return res.status(409).send("can't edit product that isn't active anymore")
            }

            const files = req.files
            if (files === undefined || !Array.isArray(files)) {
                return res.status(400).send('Please choose files')
            }
            //instead of updating files we just set the new files, needs to be fixed in the future
            const fileNames = files.map(x => x.filename);
            const product = await this.doa.updateProduct(productUUID, req.body.name, req.body.description, req.body.price, fileNames, req.body.attributes, req.body.categories)
            return res.status(200).send(product)
        } catch (error) {
            return res.status(500).send()
        }
    }

    public deleteProduct =  async (req: Request, res: Response) => {
        try {
            const productUUID = String(req.params.id)
            const user: User = await this.tokenExtractor.getUserFromToken(req)
            await this.handleNonExistingProduct(productUUID, res)
            await this.verifyThatUserOwnsProduct(productUUID, user, res)
            await this.doa.deleteProduct(productUUID)
            return res.status(200).send()
        } catch (error) {
            return res.status(500).send()
        }
    }

    private offerSchema = joi.object({
        offer: joi.number().positive().required()
    })

    public addOfferToProduct =  async (req: Request, res: Response) => {
        const { error } = this.offerSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        try {
            const productUUID = String(req.params.id)
            const user: User = await this.tokenExtractor.getUserFromToken(req)
            await this.handleNonExistingProduct(productUUID, res)
            const offer = await this.doa.addOfferToProduct(productUUID, user, req.body.offer)
            return res.status(200).send(offer)
        } catch (error) {
            return res.status(500).send()
        }
    }
}

export default ProductService
