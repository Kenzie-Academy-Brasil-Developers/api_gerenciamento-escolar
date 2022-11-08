import app from "../../app";
import AppDataSource from "../../data-source";
import { ClassRoom } from "../../entities/classRoom.entity";
import { appError } from "../../errors/appError";

export const updateClassroomService = async (
  id: string,
  data: Partial<ClassRoom>
) => {
  const classroomRepository = AppDataSource.getRepository(ClassRoom);

  const findClassroom = await classroomRepository.findOneBy({ id: id });

  if (!findClassroom) {
    throw new appError("Classroom not found", 404);
  }

  const includesClass = Object.keys(data);

  const idClass = includesClass.includes("id");
  const idSchoolGrade = includesClass.includes("id_schoolGrade");
  if (idClass || idSchoolGrade) {
    throw new appError("unable to update this fields", 401);
  }

  await classroomRepository.update(id, {
    ...findClassroom,
    ...data,
  });
  const updatedClassroom = await classroomRepository.findOneBy({ id: id });
  if (!updatedClassroom) {
    throw new appError("classroom not updated", 404);
  }

  return updatedClassroom;
};
