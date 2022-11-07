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
import { SchoolGrades } from "./schoolGrades.entity";

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
  firstGrade: BigInteger;

  @Column()
  secondGrade: BigInteger;

  @Column()
  thirdGrade: BigInteger;

  @Column()
  fourthGrade: BigInteger;

  @Column()
  absences: BigInteger;

  @OneToMany(() => GradesHistory, (grdHst) => grdHst.grade)
  grade: GradesHistory;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
