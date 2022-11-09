import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { ClassRoom } from "./classRoom.entity";
import { Teachers } from "./teachers.entity";

@Entity("teachersRoom")
export class TeachersRoom {
  find() {
    throw new Error("Method not implemented.");
  }
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "time" })
  classSchedule: string;

  @Column({ type: "date" })
  dayTheWeek: string;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @ManyToOne(() => Teachers, (tea) => tea.id)
  teacher: string;

  @OneToOne(() => ClassRoom, { eager: true })
  @JoinColumn()
  classRoom: ClassRoom;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
