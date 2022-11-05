import AppDataSource from "../../data-source";
import { Students } from "../../entities/student.entity";

const listAllStudentsService = async () => {
  const studentsRepository = AppDataSource.getRepository(Students);

  const students = studentsRepository.find();

  return students;
};

export default listAllStudentsService;
