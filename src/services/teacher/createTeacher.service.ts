import AppDataSource from "../../data-source";
import { Professionals } from "../../entities/professionals.entity";
import { Teachers } from "../../entities/teachers.entity";
import { appError } from "../../errors/appError";

const createTeacherService = async (data: Teachers) => {
  const {
    name,
    email,
    password,
    isTeacher,
    id_address,
    id_registration,
    createdAt,
    updatedAt,
    isActive,
  } = data;

  const teacherRepository = AppDataSource.getRepository(Teachers);
  const professionalRepository = AppDataSource.getRepository(Professionals);

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

  const newTeacher = teacherRepository.create({
    name,
    email,
    password,
    isTeacher,
    id_address,
    id_registration,
    createdAt,
    updatedAt,
    isActive,
  });

  await teacherRepository.save(newTeacher);

  return {
    status: 201,
    message: "registered teacher successfully",
    data: newTeacher,
  };
};

export default createTeacherService;
