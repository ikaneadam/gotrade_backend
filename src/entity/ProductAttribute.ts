import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import {Product} from "./Product";

@Entity()
export class ProductAttribute {
    @PrimaryGeneratedColumn('uuid')
    UUID: string

    @Column()
    AttributeName: string

    @Column()
    Attribute: string

    @ManyToOne(() => Product, Product => Product.attributes)
    product: Product;
}
