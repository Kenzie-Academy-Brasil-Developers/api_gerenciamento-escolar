import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  import { v4 as uuid } from "uuid";

  @Entity("classRoom")
export class ClassRoom {
  find() {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  capacity: BigInteger;
  
  @CreateDateColumn({type: "date"})
  createdAt: string;

  @UpdateDateColumn({type: "date"})
  updatedAt: string;

  
  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
