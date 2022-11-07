import { Exclude } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { SchoolGrades } from "./schoolGrades.entity";
import { Address } from "./address.entity";

@Entity("professionals")
export class Professionals {
  find() {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  type: string;

  @Column()
  permission: boolean;

  @Column({ length: 80 })
  name: string;

  @Column({ length: 20 })
  contact: string;

  @Column({ length: 80 })
  cpf: string;

  @Column({ length: 80 })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  isActive: boolean = true;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @OneToMany(() => SchoolGrades, (schlGrd) => schlGrd.registration)
  registration: SchoolGrades[];

  @OneToOne(() => Address, { eager: true })
  @JoinColumn()
  id_address: Address;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
