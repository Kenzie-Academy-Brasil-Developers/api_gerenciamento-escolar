import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { GradesHistory } from "./gradesHistory.entity";

@Entity("grades")
export class Grades {
  find() {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  school_subject: string;

  @Column()
  firstGrade: number;

  @Column()
  secondGrade: number;

  @Column()
  thirdGrade: number;

  @Column()
  fourthGrade: number;

  @Column()
  absences: number;

  @OneToMany(() => GradesHistory, (grdHst) => grdHst.grade)
  grade: GradesHistory;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
