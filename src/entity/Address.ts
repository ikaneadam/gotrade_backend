import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity('address')
export class Address {
    @PrimaryGeneratedColumn('uuid')
    UUID: string;

    @Column()
    PostalCode: string

    @Column()
    HouseNumber: string
}
