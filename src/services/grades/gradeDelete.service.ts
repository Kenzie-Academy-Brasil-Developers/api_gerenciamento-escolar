import AppDataSource from "../../data-source";
import { Grades } from "../../entities/grades.entity";
import { appError } from "../../errors/appError";

const grdDeleteService = async (id: string) => {
  const stdRepository = AppDataSource.getRepository(Grades);

  const account = await stdRepository.findOne({
    where: {
      id: id,
    },
  });

  if (!account) {
    throw new appError("Grade not found", 404);
  }

  //await stdRepository.delete(account.gradeHistory.grade);

  return account;
};

export default grdDeleteService;
