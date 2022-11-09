import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { ClassRoom } from "./classRoom.entity";
import { Grades } from "./grades.entity";
import { Professionals } from "./professionals.entity";
import { SchoolGrades } from "./schoolGrades.entity";
import { Students } from "./student.entity";

@Entity("gradesHistory")
export class GradesHistory {
  find() {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne(() => SchoolGrades, (sclGrd) => sclGrd.id, { eager: true })
  schoolGrade: SchoolGrades;

  @OneToOne(() => Professionals, { eager: true })
  @JoinColumn()
  registration: Professionals;

  @ManyToOne(() => Students, (std) => std.id)
  student: Students;

  @ManyToOne(() => Grades, (mat) => mat.id)
  grade: Grades;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
