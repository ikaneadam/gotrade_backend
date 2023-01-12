import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm"
import {Address} from "./Address";

@Entity("profile")
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: number

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