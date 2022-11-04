import AppDataSource from "../../data-souce";
import { Students } from "../../entities/student.entity";

const createStudentService = async () => {
  const studentRepository = AppDataSource.getRepository(Students);
};

export default createStudentService;
