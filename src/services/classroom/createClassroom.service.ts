import AppDataSource from "../../data-source";
import { ClassRoom } from "../../entities/classRoom.entity";
import { SchoolGrades } from "../../entities/schoolGrades.entity";
import { appError } from "../../errors/appError";
import { IClassRoomRequest } from "../../interfaces/classRoom";

export const createClassroomService = async ({
  name,
  capacity,
  id_schoolGrade,
}: IClassRoomRequest): Promise<ClassRoom> => {
  const schGrdRepository = AppDataSource.getRepository(SchoolGrades);
  const classroomRepository = AppDataSource.getRepository(ClassRoom);

  const findClassroom = await classroomRepository.findOneBy({ name: name });

  const findSchoolGrade = await schGrdRepository.findBy({
    id: id_schoolGrade,
  });

  if (findClassroom) {
    throw new appError("Classroom already exists", 400);
  }
  if (!findSchoolGrade) {
    throw new appError("School Grade not found", 404);
  }

  const createdClassroom = classroomRepository.create({
    name: name,
    capacity: capacity,
    schoolGrade: findSchoolGrade[0],
  });

  await classroomRepository.save(createdClassroom);

  return createdClassroom;
};
