import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import {Product} from "./Product";
import {User} from "./User";

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    UUID: string

    @Column({ nullable: false, type: "float" })
    finalPrice: number

    @OneToOne(() => Product)
    products: Product;

    @OneToOne(() => User)
    seller: User;

    @OneToOne(() => User)
    buyer: User;
}
