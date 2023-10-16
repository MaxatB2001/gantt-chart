import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskDataField } from "./TaskDataField.schema";

@Entity()
export class TaskDataFieldListItem {
    @PrimaryGeneratedColumn('uuid')
    uid: string;

    @Column()
    value: string;

    @Column()
    color: string;

    @ManyToOne(() => TaskDataField, (tdf) => tdf.list)
    tdf: TaskDataField
}