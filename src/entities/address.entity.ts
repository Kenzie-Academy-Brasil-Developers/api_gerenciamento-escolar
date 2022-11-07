import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("address")
export class Address {
  find() {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({length: 8})
  cep: string;

  @Column()
  district: string;

  @Column()
  number: string;

  @Column({ length: 2 })
  state: string;

  @Column()
  country: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
