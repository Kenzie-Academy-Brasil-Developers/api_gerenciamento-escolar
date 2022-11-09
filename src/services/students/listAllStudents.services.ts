import AppDataSource from "../../data-source";
import { Students } from "../../entities/student.entity";

const listAllStudentsService = async () => {
  const studentsRepository = AppDataSource.getRepository(Students);

  const students = await studentsRepository.find();

  return {
    status: 200,
    message: "search performed successfully",
    data: students,
  };
};

export default listAllStudentsService;
