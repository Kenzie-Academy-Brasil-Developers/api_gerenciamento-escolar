import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany
} from "typeorm";
import { v4 as uuid } from "uuid";
import { SchoolMaterials } from "./schoolMaterials.entity";

@Entity("schoolGrades")
export class SchoolGrades {
  find() {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 50 })
  school_grade: string;

  @ManyToMany(() => SchoolMaterials, (grade) => grade.schoolGrade)
  grade: SchoolGrades[]

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}