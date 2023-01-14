import {Repository} from "typeorm";
import {AppDataSource} from "../data-source";
import {Product} from "../entity/Product";
import {Pagination} from "../paginate/pagination";
import {PaginationOptions} from "../paginate/pagination.options";

class ProductDAO {
    private productRepository: Repository<Product>

    constructor() {
        this.productRepository = AppDataSource.getRepository(Product)
    }

    public async getProduct(UUID: string): Promise<Product> {
        const product = await this.productRepository.find({where: {UUID: UUID}})
        return product[0]
    }

    public async getProductsPaginated(options: PaginationOptions): Promise<Pagination<Product>> {
        const [data, total] = await this.productRepository.findAndCount({
            take: options.limit,
            skip: options.page,
        });
        return new Pagination<Product>({data, total,});
    }

    public async getProductsFromUserUUID(UUID: string): Promise<Product> {
        const chat = await this.productRepository.find({where: {UUID: UUID}})
        return chat[0]
    }
}

export default ProductDAO