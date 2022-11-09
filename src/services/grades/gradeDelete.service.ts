import AppDataSource from "../../data-source";
import { Grades } from "../../entities/grades.entity";
import { appError } from "../../errors/appError";

const grdDeleteService = async (id: string) => {

  const stdRepository = AppDataSource.getRepository(Grades);

  const account = await stdRepository.findOneBy({id});

  if (!account) {
    throw new appError("Grade not found", 404);
  }

  await stdRepository.delete({id: account.id});

  return account;
};

export default grdDeleteService;
