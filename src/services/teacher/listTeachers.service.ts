import AppDataSource from "../../data-source";
import { Teachers } from "../../entities/teachers.entity";

const listTeachersService = async () => {
  const teacherRepository = AppDataSource.getRepository(Teachers);

  const findTeachers = await teacherRepository.find();

  return {
    status: 200,
    message: "search performed successfully",
    data: findTeachers,
  };
};
export default listTeachersService;
