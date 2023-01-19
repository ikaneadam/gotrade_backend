import {Repository} from "typeorm";
import {AppDataSource} from "../data-source";
import {Product} from "../entity/Product";
import {PaginationOptions} from "../util/pagination/pagination.options";
import {Pagination} from "../util/pagination/pagination";
import {User} from "../entity/User";
import * as joi from "joi";

class ProductDAO {
    private productRepository: Repository<Product>

    constructor() {
        this.productRepository = AppDataSource.getRepository(Product)
    }

    public async doesProductExist(UUID: string): Promise<Boolean> {
        const product = await this.productRepository.findOne({where: {UUID: UUID}})
        console.log(product)
        return product !== null
    }

    public async getProduct(UUID: string): Promise<Product> {
        const product = await this.productRepository.find({where: {UUID: UUID}})
        return product[0]
    }

    public async getProductsPaginated(options: PaginationOptions): Promise<Pagination<Product>> {
        const [data, total] = await this.productRepository.findAndCount({
            take: options.limit,
            skip: (options.page-1) * options.limit,
        });
        return new Pagination<Product>({data, total}, options);
    }

    public async createProduct(name: string, description: string, price: number, fileNames: string[], user: User): Promise<Product> {
        if (fileNames.length === 0){
            throw "product must have atleast one picture"
        }
        const product = new Product();
        product.name = name
        product.description = description
        product.price = price
        product.mainImageURL = fileNames[0]
        product.ImagesURLS = fileNames
        product.Active = true
        product.user = user
        return await this.productRepository.save(product)
    }

    public async getProductsFromUserUUID(UUID: string): Promise<Product> {
        const chat = await this.productRepository.find({where: {UUID: UUID}})
        return chat[0]
    }
}

export default ProductDAO
