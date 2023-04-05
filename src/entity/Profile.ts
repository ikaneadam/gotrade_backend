import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm"
import {User} from "./User";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    UUID: string

    @Column()
    postalCode: string

    @Column()
    houseNumber: string

    @Column()
    email: string

    @Column()
    phoneNumber: string

    @Column()
    profilePictureURL: string

    @OneToOne(() => User, {cascade: true})
    @JoinColumn()
    user: User
}
