import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Table } from "./Table";

@Entity({ schema: "customers" })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Table, (table) => table.customers)
  @JoinColumn({ name: "tableid" })
  table?: Table;
}
