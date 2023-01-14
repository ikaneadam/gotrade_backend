import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm"
import {Address} from "./Address";

@Entity("profile")
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    UUID: string

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address

    @Column()
    email: string

    @Column()
    phoneNumber: string

    @Column()
    profilePictureURL: string
}