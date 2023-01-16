import {Request, Response} from "express";
import ProductDAO from "../dao/ProductDAO";
import BuildPaginationOptionsFromQueryParameters from "../util/pagination/BuildPaginationOptionsFromQueryParameters";
import {PaginationOptions} from "../util/pagination/pagination.options";
import validator from "validator";
import isUUID = validator.isUUID;

class ProductService {
    private readonly doa: ProductDAO;

    constructor() {
        this.doa = new ProductDAO()
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
            return res.status(500);
        }
    }

    private getProducts =  async (req: Request, res: Response) => {
        try{
            const paginationOptions: PaginationOptions = await BuildPaginationOptionsFromQueryParameters.buildPaginationOptionsFromQueryParameters(req);
            const products = (await this.doa.getProductsPaginated(paginationOptions))
            return res.status(200).send(products)
        }catch (e){
            return res.status(500);
        }
    }


    public  postProduct =  async (req: Request, res: Response) => {
        try {

        } catch (error) {
            res.status(500);
        }
    }

    public putProduct =  async (req: Request, res: Response) => {
        try {

        } catch (error) {
            res.status(500);
        }
    }

    public deleteProduct =  async (req: Request, res: Response) => {
        try {

        } catch (error) {
            res.status(500);
        }
    }

    public addOfferToProduct =  async (req: Request, res: Response) => {
        try {

        } catch (error) {
            res.status(500);
        }
    }

    public deleteOfferFromProduct =  async (req: Request, res: Response) => {
        try {

        } catch (error) {
            res.status(500);
        }
    }

    public updateOffer =  async (req: Request, res: Response) => {
        try {

        } catch (error) {
            res.status(500);
        }
    }
}

export default ProductService
