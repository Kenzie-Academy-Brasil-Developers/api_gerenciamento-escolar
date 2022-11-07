import AppDataSource from "../../data-source";
import { TeachersRoom } from "../../entities/teachersRoom.entity";
import { appError } from "../../errors/appError";

export const listTeacherClassroomService = async (idTeacher: string) => {
  const teacherRepository = AppDataSource.getRepository(TeachersRoom);

  const findTeacher = await teacherRepository.findOne({
    where: { teacher: idTeacher },
    relations: { classRoom: true },
  });

  if (!findTeacher) {
    throw new appError("Teacher not found", 404);
  }

  return findTeacher;
};
