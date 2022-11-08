import AppDataSource from "../../data-source";
import { Students } from "../../entities/student.entity";
import { IHistoryUpdate } from "../../interfaces/schoolGrades";
import { Grades } from "../../entities/grades.entity";
import { SchoolGrades } from "../../entities/schoolGrades.entity";
import { appError } from "../../errors/appError";

const gradeUpdateService = async (data: IHistoryUpdate, id: string) => {
  const studentRepository = AppDataSource.getRepository(Students);

  const returnStd = await studentRepository.findOneBy({
    id,
  });

  if (!returnStd) {
    throw new appError("Student not found", 404);
  }

  await studentRepository.save({
    id,
    school_subject: data.school_subject
      ? data.school_subject
      : returnStd.gradeHistory.grade.school_subject,
    firstGrade: data.firstGrade
      ? data.firstGrade
      : returnStd.gradeHistory.grade.firstGrade,
    secondGrade: data.secondGrade
      ? data.secondGrade
      : returnStd.gradeHistory.grade.secondGrade,
    thirdGrade: data.thirdGrade
      ? data.thirdGrade
      : returnStd.gradeHistory.grade.thirdGrade,
    fourthGrade: data.fourthGrade
      ? data.fourthGrade
      : returnStd.gradeHistory.grade.fourthGrade,
    absences: data.absences
      ? data.absences
      : returnStd.gradeHistory.grade.absences,
  });

  const resultStd = await studentRepository.findOneBy({
    id,
  });

  //console.log(returnGrade)
  return resultStd!;
};

export default gradeUpdateService;
