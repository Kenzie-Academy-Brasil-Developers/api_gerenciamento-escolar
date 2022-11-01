import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Grades } from "./grades.entity";

@Entity("schoolGrades")
export class SchoolGrades {
  find() {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 50 })
  schoolGrade: string;

  @ManyToMany(() => Grades, (grade) => grade.schoolGrade)
  grade: Grades[]

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}