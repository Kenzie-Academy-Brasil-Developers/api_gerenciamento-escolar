import { Exclude } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Address } from "./address.entity";
import { ClassRoom } from "./classRoom.entity";
import { GradesHistory } from "./gradesHistory.entity";
import { Professionals } from "./professionals.entity";
import { SchoolGrades } from "./schoolGrades.entity";
import { TeachersRoom } from "./teachersRoom.entity";

@Entity("students")
export class Students {
  find() {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 80 })
  name: string;

  @Column()
  age: string;

  @Column({ length: 100 })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  contact: string;

  @Column({ default: false })
  isTeacher: boolean;

  @Column()
  isActive: boolean = true;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @OneToMany(() => TeachersRoom, (room) => room.teacher)
  teacher: TeachersRoom[];

  @OneToOne(() => ClassRoom)
  @JoinColumn()
  classRoom: ClassRoom;

  @OneToOne(() => Address, { eager: true })
  @JoinColumn()
  address: Address;

  @ManyToOne(() => Professionals, (professionals) => professionals.id)
  registration: Professionals;

  @OneToMany(() => SchoolGrades, (grd) => grd.name)
  schoolGrade: SchoolGrades;

  @OneToMany(() => GradesHistory, (grdHt) => grdHt.student)
  gradeHistory: GradesHistory;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
