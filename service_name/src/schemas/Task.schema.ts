import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskDataFieldValue } from './TaskDataFieldValue.schema';

export class ColumnNumericTransformer {
    to(data: number): number {
      return data;
    }
    from(data: string): number {
      return parseFloat(data);
    }
  }

@Entity()
export class TaskSchema {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column()
  title: string;
  @Column({type: 'bigint', transformer: new ColumnNumericTransformer()})
  startDate: number;
  @Column({type: 'bigint', transformer: new ColumnNumericTransformer()})
  endDate: number;
  @Column()
  userUid: string;
  @Column({nullable: true})
  projectUid: string;
  @Column({ nullable: true })
  parentId: number | null;
  @OneToMany(type => TaskDataFieldValue,  dataValue => dataValue.task, {eager: true})
  taskDataValues: TaskDataFieldValue[]
}
