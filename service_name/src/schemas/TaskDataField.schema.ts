import { DataField } from "src/enums/data-field.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskDataFieldListItem } from "./TaskDataFieldListItem";

@Entity()
export class TaskDataField {
    @PrimaryGeneratedColumn('uuid')
    uid: string;

    @Column()
    name: string

    @Column({enum: DataField})
    type: DataField

    @OneToMany(() => TaskDataFieldListItem, (listItem) => listItem.tdf, {cascade: true, eager: true})
    list: TaskDataFieldListItem[]
}