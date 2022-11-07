import AppDataSource from "../../data-source";
import { ClassRoom } from "../../entities/classRoom.entity";
import { appError } from "../../errors/appError";

export const deleteClassroomService = async (id: string) => {
  const classRoomRepository = AppDataSource.getRepository(ClassRoom);

  const deletedClassroom = await classRoomRepository.findOneBy({ id: id });

  if (!deletedClassroom) {
    throw new appError("Classroom not found", 404);
  }

  await classRoomRepository.delete({ id: deletedClassroom.id });
};
