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
  const schGrdRepository = AppDataSource.getMongoRepository(SchoolGrades);
  const classroomRepository = AppDataSource.getRepository(ClassRoom);

  const findClassroom = await classroomRepository.findOneBy({ name: name });

  const findSchoolGrade = await schGrdRepository.findOneBy({
    id: id_schoolGrade,
  });
  if (findClassroom) {
    throw new appError("Classroom already exists", 403);
  }
  if (!findSchoolGrade) {
    throw new appError("School Grade not found", 404);
  }

  const createdClassroom = classroomRepository.create({
    name: name,
    capacity,
    schoolGrade: findSchoolGrade,
  });

  await classroomRepository.save(createdClassroom);

  return createdClassroom;
};
