import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { ClassRoom } from "./classRoom.entity";
import { GradesHistory } from "./gradesHistory.entity";
import { Professionals } from "./professionals.entity";
import { Students } from "./student.entity";

@Entity("schoolGrades")
export class SchoolGrades {
  find() {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 50 })
  name: string;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @ManyToOne(() => ClassRoom, (clsRm) => clsRm.name)
  nameClass: ClassRoom;

  @OneToOne(() => Professionals, { eager: true })
  @JoinColumn()
  registration: Professionals;

  @ManyToOne(() => Students, (std) => std.id)
  student: Students;

  @OneToMany(() => GradesHistory, (sclGrd) => sclGrd.schoolGrade)
  schoolGrade: GradesHistory;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
