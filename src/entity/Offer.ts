import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import {User} from "./User";
import {Product} from "./Product";

@Entity('offer')
export class Offer {
    @PrimaryGeneratedColumn('uuid')
    UUID: string

    @Column({ nullable: false, type: "float" })
    offer: number

    @ManyToOne(() => Product, Product => Product.offers)
    product: Product;
}
