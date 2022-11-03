import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn
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

  @Column({ length: 50 })
  name: string;

  @CreateDateColumn({type: "date"})
  createdAt: string;

  @UpdateDateColumn({type: "date"})
  updatedAt: string;

  @ManyToOne(() => ClassRoom, (clsRm) => clsRm.name)
  nameClass: ClassRoom

  @OneToOne(() => Professionals, { eager: true })
  @JoinColumn()
  registration: Professionals;

  @ManyToOne(() => Students, (std) => std.id)
  student: Students

  @ManyToMany(() => SchoolGrades, (sclGrd) => sclGrd.id)
  schoolGrade: SchoolGrades

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}