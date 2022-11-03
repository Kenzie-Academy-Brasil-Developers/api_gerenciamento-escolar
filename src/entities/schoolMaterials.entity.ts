import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { GradesHistory } from "./gradesHistory.entity";
import { SchoolGrades } from "./schoolGrades.entity";

@Entity("schoolMaterials")
export class SchoolMaterials {
  find() {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  school_subject: string;

	firstGrade: BigInteger;

	secondGrade: BigInteger;

	thirdGrade: BigInteger;

	fourthGrade: BigInteger;

	absences: BigInteger;
	
  @ManyToMany(() => GradesHistory, (grdHst) => grdHst.grade)
  history: GradesHistory;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
