import AppDataSource from "../../data-source";
import { TeachersRoom } from "../../entities/teachersRoom.entity";
import { appError } from "../../errors/appError";

const deleteTeacherClassroomService = async (id: any) => {
  const repositoryTeacherClass = AppDataSource.getRepository(TeachersRoom);

  const findRepository = repositoryTeacherClass.findOneBy({ id: id });

  if (!findRepository) {
    throw new appError("teacher class not found", 404);
  }

  await repositoryTeacherClass.delete({ id: id });
};
export default deleteTeacherClassroomService;
