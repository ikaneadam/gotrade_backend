import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import {Product} from "./Product";
import {User} from "./User";

@Entity()
export class Offer {
    @PrimaryGeneratedColumn('uuid')
    UUID: string

    @Column({ nullable: false, type: "float" })
    offer: number

    @ManyToOne(() => Product, Product => Product.offers)
    product: Product;

    @ManyToOne(() => User, {cascade: true, eager: true})
    user: User;
}
