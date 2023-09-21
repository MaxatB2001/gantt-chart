import { DataField } from "src/enums/data-field.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TaskDataField {
    @PrimaryGeneratedColumn('uuid')
    uid: string;

    @Column()
    name: string

    @Column({enum: DataField})
    type: DataField

    @Column({
        type: 'jsonb',
        array: false,
        default: () => "'[]'",
        nullable: false,
    })
    list: Array<string>
}