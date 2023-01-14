import {Request, Response} from "express";
import ProductDAO from "../dao/ProductDAO";


class ProductService {
    private readonly doa: ProductDAO;

    constructor() {
        this.doa = new ProductDAO()
    }

    public getProduct =  async (req: Request, res: Response) => {
        try {

            res.send(await this.doa.getProductsPaginated({
                limit: 10,
                page: 0,
            }))
        } catch (error) {
            res.status(500);
        }
    }

    public postProduct =  async (req: Request, res: Response) => {
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
