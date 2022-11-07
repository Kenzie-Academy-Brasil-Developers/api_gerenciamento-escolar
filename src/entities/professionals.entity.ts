import { Exclude } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

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

  @OneToOne(() => Address, { eager: true })
  @JoinColumn()
  id_address: Address;
}
