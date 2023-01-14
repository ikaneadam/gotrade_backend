import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity('productAttribute')
export class ProductAttribute {
    @PrimaryGeneratedColumn('uuid')
    UUID: string

    @Column()
    AttributeName: string

    @Column()
    Attribute: string
}
