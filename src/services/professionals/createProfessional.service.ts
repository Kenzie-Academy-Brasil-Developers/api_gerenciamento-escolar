import AppDataSource from "../../data-source";
import { Professionals } from "../../entities/professionals.entity";
import { Students } from "../../entities/student.entity";
import { Teachers } from "../../entities/teachers.entity";
import { appError } from "../../errors/appError";
import { hashSync } from "bcryptjs";

const createProfessionalService = async (data: Professionals) => {
  const {
    type,
    permission,
    name,
    cpf,
    contact,
    email,
    password,
    id_address,
    createdAt,
    updatedAt,
    isActive,
  } = data;

  const professionalRepository = AppDataSource.getRepository(Professionals);
  const teacherRepository = AppDataSource.getRepository(Teachers);
  const studentRepository = AppDataSource.getRepository(Students);

  const studentsAlreadyExists = await studentRepository.findOneBy({
    email: email,
  });

  if (studentsAlreadyExists) {
    throw new appError("email is already exists", 400);
  }

  const professionalAlreadyExists = await professionalRepository.findOneBy({
    email: email,
  });

  if (professionalAlreadyExists) {
    throw new appError("email is already exists", 400);
  }

  const teacherAlreadyExists = await teacherRepository.findOneBy({
    email: email,
  });

  if (teacherAlreadyExists) {
    throw new appError("email is already exists", 400);
  }

  const hashedPassword = hashSync(password, 10);

  const newProfessional = professionalRepository.create({
    type,
    permission,
    name,
    cpf,
    contact,
    email,
    password: hashedPassword,
    id_address,
    createdAt,
    updatedAt,
    isActive,
  });

  await professionalRepository.save(newProfessional);

  return {
    status: 201,
    message: "registered professional successfully",
    data: newProfessional,
  };
};

export default createProfessionalService;
