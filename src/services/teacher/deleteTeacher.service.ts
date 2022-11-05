import AppDataSource from "../../data-source";
import { Teachers } from "../../entities/teachers.entity";
import { appError } from "../../errors/appError";

const deleteTeacherService = async (id: string) => {
  const teacherRepository = AppDataSource.getRepository(Teachers);

  const teacher = await teacherRepository.findOneBy({
    id,
  });

  if (!teacher) {
    throw new appError("teacher not found", 404);
  }

  await teacherRepository.update(id, {
    isActive: false,
  });
};
export default deleteTeacherService;
