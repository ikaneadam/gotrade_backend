import {Column, Entity, PrimaryColumn} from 'typeorm'

@Entity()
export class Category {
    @PrimaryColumn({ unique: true })
    category: string
}
