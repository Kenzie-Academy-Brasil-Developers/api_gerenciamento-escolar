import AppDataSource from "../../data-source";
import { Students } from "../../entities/student.entity";
import { appError } from "../../errors/appError";
import { hash } from "bcryptjs";
const updateStudentService = async (id: string, userData: any) => {
  const studentRepository = AppDataSource.getRepository(Students);

  const studentExists = studentRepository.findBy({ id });
  if (!studentExists) {
    throw new appError("invalid student", 400);
  }

  await studentRepository.update(id, {
    name: userData.name,
    email: userData.email,
    age: userData.age,
    contact: userData.contact,
  });

  const student = await studentRepository.findOneBy({ id });

  return student;
};

export default updateStudentService;
