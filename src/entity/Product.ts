import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import {User} from "./User";
import {Offer} from "./Offer";
import {ProductAttribute} from "./ProductAttribute";

@Entity("product")
export class Product {
    @PrimaryGeneratedColumn('uuid')
    UUID: string

    @Column({ nullable: false})
    name: string

    @Column({ nullable: false})
    description: string

    @Column({ nullable: false})
    Active: boolean

    @Column({ nullable: false, type: "float" })
    price: number

    @Column({ nullable: false})
    mainImageURL: string

    @ManyToOne(() => Offer)
    @JoinColumn()
    offers: Offer[]

    @ManyToOne(() => ProductAttribute,{eager: true,})
    @JoinColumn()
    attributes: ProductAttribute[]

    @Column("text", { array: true })
    ImagesURLS: string[]

    @OneToMany(() => User, User => User.products,{eager: true,})
    user: User;
}
