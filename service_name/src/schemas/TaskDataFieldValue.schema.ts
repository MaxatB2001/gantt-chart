import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskSchema } from './Task.schema';

@Entity()
export class TaskDataFieldValue {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column()
  value: string

  @Column()
  taskDataFieldUId: string

  @ManyToOne(type => TaskSchema, task => task.taskDataValues, {onDelete: "CASCADE"})
  task: TaskSchema
}
