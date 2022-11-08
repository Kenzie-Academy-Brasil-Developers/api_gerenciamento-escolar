import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Professionals } from "./professionals.entity";
import { Teachers } from "./teachers.entity";

@Entity("address")
export class Address {
  find() {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 8 })
  cep: string;

  @Column()
  district: string;

  @Column()
  number: string;

  @Column({ length: 2 })
  state: string;

  @Column()
  country: string;

  @OneToMany(() => Professionals, (professionals) => professionals.id_address)
  professionals: Professionals[];

  @OneToMany(() => Teachers, (teachers) => teachers.id_address)
  teachers: Teachers[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
