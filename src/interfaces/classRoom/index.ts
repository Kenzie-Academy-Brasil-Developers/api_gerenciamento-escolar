export interface IClassRoomRequest {
  name: string;
  capacity: number;
  id_schoolGrade: string;
}

export interface IClassroomUpdate {
  name?: string;
  capacity?: number;
}
