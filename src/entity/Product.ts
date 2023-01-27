import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import {User} from "./User";
import {Offer} from "./Offer";
import {ProductAttribute} from "./ProductAttribute";
import {Category} from "./Category";

@Entity()
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

    @ManyToMany(() => Category,{ eager : true, cascade: ["insert"]},)
    @JoinTable()
    category: Category[]

    @OneToMany(() => Offer, (offer) => offer.product,{
        cascade: ["insert"],
    })
    @JoinColumn()
    offers: Offer[]

    @OneToMany(() => ProductAttribute, (ProductAttribute) => ProductAttribute.product,{
        cascade: ["insert"],
    })
    @JoinColumn()
    attributes: ProductAttribute[]

    @Column("text", { array: true })
    ImagesURLS: string[]

    @ManyToOne(() => User, User => User.products)
    user: User;
}
