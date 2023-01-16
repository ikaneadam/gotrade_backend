import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm"
import {User} from "./User";
import {Offer} from "./Offer";

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

    @Column("text", { array: true })
    ImagesURLS: string[]

    @ManyToOne(() => User, User => User.products)
    user: User;
}
