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
import { Students } from "./student.entity";


@Entity("schoolGrades")
export class SchoolGrades {
  find() {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToMany(() => SchoolGrades, (sclGrd) => sclGrd.id)
  schoolGrade: SchoolGrades

  @ManyToOne(() => ClassRoom, (clsRm) => clsRm.id)
  nameClass: ClassRoom

  @OneToOne(() => Professionals, { eager: true })
  @JoinColumn()
  registration: Professionals;

  @ManyToOne(() => Students, (std) => std.id)
  student: Students

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}