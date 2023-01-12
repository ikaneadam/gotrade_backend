import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import {User} from "./User";

@Entity('notification')
export class Notification {
    @PrimaryGeneratedColumn('uuid')
    UUID: string;

    @Column()
    Notification: string

    @ManyToOne(() => User, User => User.notifications)
    user: User;
}
