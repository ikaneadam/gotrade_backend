import {Repository} from "typeorm";
import {AppDataSource} from "../data-source";
import {Product} from "../entity/Product";
import {PaginationOptions} from "../util/pagination/pagination.options";
import {Pagination} from "../util/pagination/pagination";
import {User} from "../entity/User";
import {ProductAttribute} from "../entity/ProductAttribute";
import {Category} from "../entity/Category";
import {Offer} from "../entity/Offer";
import NotificationDAO from "./NotificationDAO";

class ProductDAO {
    private productRepository: Repository<Product>
    private notificationDAO: NotificationDAO

    constructor() {
        this.productRepository = AppDataSource.getRepository(Product)
        this.notificationDAO = new NotificationDAO()
    }

    public async doesProductExist(UUID: string): Promise<Boolean> {
        const product = await this.productRepository.findOne({where: {UUID: UUID}})
        return product !== null
    }

    public async getProduct(UUID: string): Promise<Product> {
        const product = await this.productRepository.find({
            relations: {
                user: true,
                attributes: true,
                category: true,
                offers: true
            },
            where: {
                UUID: UUID}
            }
        )
        return product[0]
    }

    public async getProducts(options: PaginationOptions, productFilterOptions: any): Promise<Pagination<Product>> {
        const [data, total] = await this.productRepository.findAndCount({
            take: options.limit,
            skip: (options.page-1) * options.limit,
            relations: {
                user: true,
                attributes: true,
                category: true,
                offers: true
            },
            where: productFilterOptions,
        });
        return new Pagination<Product>({data, total}, options);
    }

    public async createProduct(name: string, description: string, price: number, fileNames: string[], attributes: ProductAttribute[], categories: Category[],user: User): Promise<Product> {
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
        product.category = categories
        product.attributes = attributes
        return await this.productRepository.save(product)
    }

    public async updateProduct(productUUID: string, name: string, description: string, price: number, fileNames: string[], attributes: ProductAttribute[], categories: Category[]): Promise<Product> {
        if (fileNames.length === 0){
            throw "product must have atleast one picture"
        }
        const product = await this.productRepository.findOne({where: {UUID: productUUID}})
        product.name = name
        product.description = description
        product.price = price
        product.mainImageURL = fileNames[0]
        product.ImagesURLS = fileNames
        product.category = categories
        product.attributes = attributes
        return await this.productRepository.save(product)
    }

    public async isProductFromUser(productUUID: string, userUUID: string): Promise<Boolean> {
        const product = await this.productRepository.findOne({
            relations: {
                user: true,
            },
            where: {
                UUID: productUUID}
            }
        )

        if (product === null) {
            return false
        }

        return product.user.UUID === userUUID
    }

    public async isProductActive(productUUID: string): Promise<Boolean> {
        const product = await this.productRepository.findOne({
                where: {
                    UUID: productUUID}
            }
        )

        if (product === null) {
            return false
        }

        return product.Active
    }

    public async deleteProduct(productUUID: string): Promise<void> {
        const product = await this.productRepository.findOne({
                where: {
                    UUID: productUUID}
            }
        )

        if (product === null) {
            throw "product doesn't exist"
            return
        }

        product.Active = false
        await this.productRepository.save(product)
        return
    }

    public async addOfferToProduct(productUUID: string, user: User, offerPrice: number){
        const product = await this.getProduct(productUUID)
        if(product === null){
            throw "product doesn't exist"
            return
        }
        const offer = new Offer();
        offer.offer = offerPrice
        offer.user = user
        product.offers = [].concat(product.offers, offer);
        await this.productRepository.save(product)
        await this.notificationDAO.addProductOfferNotificationToUser(user, productUUID, offerPrice)
        return offer
    }
}

export default ProductDAO
