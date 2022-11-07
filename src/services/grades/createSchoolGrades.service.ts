import AppDataSource from "../../data-source";
import { Professionals } from "../../entities/professionals.entity";
import { SchoolGrades } from "../../entities/schoolGrades.entity";
import { appError } from "../../errors/appError";

const schlGrdCreateService = async (data: SchoolGrades) => {
  const { name, registration } = data;

  const schlGrdRepository = AppDataSource.getRepository(SchoolGrades);
  const schlGrade = await schlGrdRepository.find();
  const profRepository = AppDataSource.getRepository(Professionals);

  const schlGrdExists = schlGrade.find((cat) => cat.name === name);
  if (schlGrdExists) {
    throw new appError("SchoolGrade already exists");
  }

  const schlGrd = new SchoolGrades();
  schlGrd.name = name;
  schlGrd.registration = registration;

  schlGrdRepository.create(schlGrd);
  await schlGrdRepository.save(schlGrd);

  return {
    status: 201,
    message: "Grades add successfully",
    data: schlGrd,
  };
};

export default schlGrdCreateService;
