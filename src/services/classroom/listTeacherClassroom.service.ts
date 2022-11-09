import AppDataSource from "../../data-source";
import { Teachers } from "../../entities/teachers.entity";
import { TeachersRoom } from "../../entities/teachersRoom.entity";
import { appError } from "../../errors/appError";

export const listTeacherClassroomService = async (idTeacher: string) => {
  const teacherRoomRepository = AppDataSource.getRepository(TeachersRoom);
  const teacherRepository = AppDataSource.getRepository(Teachers);

  const findTeacher = await teacherRepository.findOneBy({ id: idTeacher });

  if (!findTeacher) {
    throw new appError("Teacher not found", 404);
  }
  const findTeacherRoom = await teacherRoomRepository.find({
    where: { id: findTeacher.id },
    relations: { classRoom: true },
  });

  return findTeacherRoom;
};
