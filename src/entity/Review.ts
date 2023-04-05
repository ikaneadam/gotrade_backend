import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import {User} from "./User";

@Entity()
export class Review {
    @PrimaryGeneratedColumn('uuid')
    UUID: string

    @Column()
    rating: number

    @Column()
    Review: string

    @ManyToOne(() => User, User => User.reviews)
    user: User;
}
