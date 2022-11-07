export interface IClassRoomRequest {
  name: string;
  capacity: number;
  id_schoolGrade: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IClassroomUpdate {
  name?: string;
  capacity?: number;
}
