import { hashSync } from "bcryptjs";
import AppDataSource from "../../data-source";
import { Professionals } from "../../entities/professionals.entity";
import { Teachers } from "../../entities/teachers.entity";
import { appError } from "../../errors/appError";

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
