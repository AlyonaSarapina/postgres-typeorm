import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Room } from "./Room";
import { Customer } from "./Customer";

@Entity({ schema: "floor_plan" })
export class Tables {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  number: number;

  @ManyToOne(() => Room, (room) => room.tables)
  @JoinColumn({ name: "roomid" })
  room: Room;

  @OneToMany(() => Customer, (customer) => customer.table)
  customers: Customer[];
}
