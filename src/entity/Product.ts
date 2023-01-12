import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm"
import {User} from "./User";

@Entity("product")
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: number

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

    @Column("text", { array: true })
    ImagesURL: string[]

    @ManyToOne(() => User, User => User.products)
    user: User;
}