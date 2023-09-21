import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ViewSchema {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column()
  title: string
    
  @Column()
  groupBy: string

  @Column("json")
  sortBy: object

  @Column("json")
  filters: object
}