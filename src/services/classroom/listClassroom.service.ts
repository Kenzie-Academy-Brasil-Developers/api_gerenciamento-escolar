import AppDataSource from "../../data-source";
import { ClassRoom } from "../../entities/classRoom.entity";

export const listClassroomService = async (): Promise<ClassRoom[]> => {
  const classroomRepository = AppDataSource.getRepository(ClassRoom);

  const categories = await classroomRepository.find();

  return categories;
};
