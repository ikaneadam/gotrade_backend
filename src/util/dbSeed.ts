import {AppDataSource} from "../data-source";
import {Product} from "../entity/Product";
import { faker } from '@faker-js/faker/locale/de';

AppDataSource.initialize().then(async () => {
    const productRepository = AppDataSource.getRepository(Product)
    for (let i = 0; i < 500; i++) {
        const product = new Product()
        product.name = faker.commerce.product()
        product.Active = true
        product.description = faker.commerce.productDescription()
        product.price = createPrice()
        product.mainImageURL = faker.image.nature()
        const pictures = []
        pictures.push(faker.image.nature())
        pictures.push(faker.image.nature())
        pictures.push(faker.image.nature())
        pictures.push(faker.image.nature())
        product.ImagesURLS = pictures
        await productRepository.save(product)
    }
}).catch(error => console.log(error))

function createPrice(min = 50, max = 100, decimalPlaces = 2) {
    const rand = Math.random()*(max-min) + min;
    const power = Math.pow(10, decimalPlaces);
    return Math.floor(rand*power) / power;
}

