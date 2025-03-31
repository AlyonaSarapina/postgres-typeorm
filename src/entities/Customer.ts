import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Tables } from "./Tables";

@Entity({ schema: "customers" })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Tables, (table) => table.customers)
  @JoinColumn({ name: "tableid" })
  table?: Tables;
}
