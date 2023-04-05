import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import {User} from "./User";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn('uuid')
    UUID: string

    @Column({ nullable: false})
    notification: string

    //reference to another entity if there is any
    @Column({ nullable: true})
    about: string

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdDate: Date;

    @ManyToOne(() => User, User => User.notifications)
    user: User;
}
