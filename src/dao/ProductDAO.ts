import {Repository} from "typeorm";
import {AppDataSource} from "../data-source";
import {Product} from "../entity/Product";
import {PaginationOptions} from "../util/pagination/pagination.options";
import {Pagination} from "../util/pagination/pagination";

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

    public async getProductsFromUserUUID(UUID: string): Promise<Product> {
        const chat = await this.productRepository.find({where: {UUID: UUID}})
        return chat[0]
    }
}

export default ProductDAO
