import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import {Profile} from "./Profile";
import {Product} from "./Product";
import {Notification} from "./Notification";
import {Review} from "./Review";
import {Order} from "./Order";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    UUID: string

    @Column({ unique: true })
    username: string

    @Column({ select: false })
    password: string

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile

    @ManyToOne(() => Product)
    @JoinColumn()
    products: Product[]

    @ManyToOne(() => Order)
    @JoinColumn()
    order: Order[]

    @ManyToOne(() => Notification)
    @JoinColumn()
    notifications: Notification[]

    @ManyToOne(() => Notification)
    @JoinColumn()
    reviews: Review[]
}
