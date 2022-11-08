import AppDataSource from "../../data-source";
import { Students } from "../../entities/student.entity";

const listAllStudentsService = async () => {
  const studentsRepository = AppDataSource.getRepository(Students);

  const students = await studentsRepository.find();
  console.log("teste do teste", students);
  return students;
};

export default listAllStudentsService;
