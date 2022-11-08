import AppDataSource from "../../data-source";
import { Students } from "../../entities/student.entity";
import { IHistoryUpdate } from "../../interfaces/schoolGrades";
import { appError } from "../../errors/appError";

const gradeUpdateService = async (data: IHistoryUpdate, id: string) => {
  const stdRepository = AppDataSource.getRepository(Students);
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
      : findStdt.gradeHistory.grade.school_subject,
    firstGrade: data.firstGrade
      ? data.firstGrade
      : findStdt.gradeHistory.grade.firstGrade,
    secondGrade: data.secondGrade
      ? data.secondGrade
      : findStdt.gradeHistory.grade.secondGrade,
    thirdGrade: data.thirdGrade
      ? data.thirdGrade
      : findStdt.gradeHistory.grade.thirdGrade,
    fourthGrade: data.fourthGrade
      ? data.fourthGrade
      : findStdt.gradeHistory.grade.fourthGrade,
    absences: data.absences
      ? data.absences
      : findStdt.gradeHistory.grade.absences,
  });

  const resultStd = await stdRepository.findOneBy({
    id,
  });

  //console.log(returnGrade)
  return resultStd!;
};

export default gradeUpdateService;
