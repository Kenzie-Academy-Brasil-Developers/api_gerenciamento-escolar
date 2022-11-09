import AppDataSource from "../../data-source";
import { Students } from "../../entities/student.entity";
import { IHistoryUpdate } from "../../interfaces/schoolGrades";
import { appError } from "../../errors/appError";
import { Grades } from "../../entities/grades.entity";

const gradeUpdateService = async (data: IHistoryUpdate, id: string) => {
  const stdRepository = AppDataSource.getRepository(Grades);
  const findStdt = await stdRepository.findOneBy({
    id,
  });
  if (!findStdt) {
    throw new appError("Not found student", 400);
  }

  await stdRepository.save({
    id,
    school_subject: data.school_subject
      ? data.school_subject
      : findStdt.school_subject,
    firstGrade: data.firstGrade
      ? data.firstGrade
      : findStdt.firstGrade,
    secondGrade: data.secondGrade
      ? data.secondGrade
      : findStdt.secondGrade,
    thirdGrade: data.thirdGrade
      ? data.thirdGrade
      : findStdt.thirdGrade,
    fourthGrade: data.fourthGrade
      ? data.fourthGrade
      : findStdt.fourthGrade,
    absences: data.absences
      ? data.absences
      : findStdt.absences,
  });

  const resultStd = await stdRepository.findOneBy({
    id,
  });

  //console.log(returnGrade)
  return resultStd!;
};

export default gradeUpdateService;
