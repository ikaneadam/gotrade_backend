import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    UUID: string;

    @Column()
    category: string
}
