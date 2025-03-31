import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Tables } from "./Tables";

@Entity({ schema: "floor_plan" })
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Tables, (tables) => tables.room)
  tables: Tables[];
}
