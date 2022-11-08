export interface ITeacherRequest {
  name: string;
  email: string;
  password: string;
  isPermission: boolean;
}

export interface ITeacher extends ITeacherRequest {
  id: string;
  name: string;
  email: string;
  isTeacher: boolean;
  id_address: string;
  id_registration: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: true;
}

export interface ITeacherLogin {
  email: string;
  password: string;
}

export interface ITeacherUpdate {
  name?: string;
  email?: string;
  password?: string;
}

export interface ITeacherClassroom {
  idTeacher: string;
  idClassroom: string;
  classSchedule: string;
  dayTheWeek: string;
}

export interface ITeacherClassroomUpdate {
  classSchedule?: string;
  dayTheWeek?: string;
}
