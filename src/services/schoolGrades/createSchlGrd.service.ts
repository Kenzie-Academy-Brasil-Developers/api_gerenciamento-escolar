import AppDataSource from "../../data-source";
import { SchoolGrades } from "../../entities/schoolGrades.entity";
import { appError } from "../../errors/AppError";

const schlGrdCreateService = async ({ name, registration }: SchoolGrades) => {
  const schlGrdRepository = AppDataSource.getRepository(SchoolGrades);
  const schlGrd = await schlGrdRepository.find();

  const schlGrdExists = schlGrd.find((grd) => grd.name === name);
  if (schlGrdExists) {
    throw new appError("Email or Passowrd already exists");
  }

  const newSchoolGrade = new SchoolGrades();
  newSchoolGrade.name = name;
  newSchoolGrade.registration = registration;

  schlGrdRepository.create(newSchoolGrade);
  await schlGrdRepository.save(newSchoolGrade);

  return newSchoolGrade;
};

export default schlGrdCreateService;
