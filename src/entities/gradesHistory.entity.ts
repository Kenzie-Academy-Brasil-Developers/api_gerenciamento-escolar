import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToMany
} from "typeorm";
import { v4 as uuid } from "uuid";
import { ClassRoom } from "./classRoom.entity";
import { Professionals } from "./professionals.entity";
import { SchoolGrades } from "./schoolGrades.entity";
import { SchoolMaterials } from "./schoolMaterials.entity";
import { Students } from "./student.entity";


@Entity("gradesHistory")
export class GradesHistory {
  find() {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToMany(() => SchoolGrades, (sclGrd) => sclGrd.id)
  schoolGrade: SchoolGrades

  @ManyToOne(() => Students, (std) => std.schoolGrade)
  student: Students[]

  @OneToOne(() => Professionals, { eager: true })
  @JoinColumn()
  registration: Professionals;

  @ManyToOne(() => Students, (std) => std.id)
  studentHistory: Students

  @ManyToMany(() => SchoolMaterials, (mat) => mat.id)
  grade: SchoolMaterials

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}