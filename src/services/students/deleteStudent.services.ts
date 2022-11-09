import AppDataSource from "../../data-source";
import { Students } from "../../entities/student.entity";
import { appError } from "../../errors/appError";

const deleteStudentService = async (id: string) => {
  const studentRepository = AppDataSource.getRepository(Students);

  const student = await studentRepository.findOne({ where: { id } });

  if (!student) {
    throw new appError("invalid student", 404);
  }

  await studentRepository.update(id, { isActive: false });
};

export default deleteStudentService;
