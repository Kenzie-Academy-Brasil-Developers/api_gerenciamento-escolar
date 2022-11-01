import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { SchoolGrades } from "./schoolGrades.entity";

@Entity("grades")
export class Grades {
  find() {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 50 })
  schoolGrade: string;

  @ManyToMany(() => SchoolGrades, (schGrd) => schGrd.id)
  schoolGrade: SchoolGrades;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
