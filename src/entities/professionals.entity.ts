import { Exclude } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import { v4 as uuid } from "uuid";
import { SchoolGrades } from "./schoolGrades.entity";

@Entity("professionals")
export class Professionals {
  find() {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  isPermission: boolean;

  @Column({ length: 80 })
  name: string;

  @Column({ length: 20})
  contact: string;

  @Column({ length: 80})
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

  @OneToMany(() => SchoolGrades, schlGrd => schlGrd.registration)
  registration: SchoolGrades[]

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
