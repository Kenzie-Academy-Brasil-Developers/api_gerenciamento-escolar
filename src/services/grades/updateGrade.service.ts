import AppDataSource from "../../data-source";
import { Grades } from "../../entities/grades.entity";
import { SchoolGrades } from "../../entities/schoolGrades.entity";
import { appError } from "../../errors/AppError";

const gradeUpdateService = async (
  data: Grades,
  id: string
) => {
  const grdRepository = AppDataSource.getRepository(Grades);
  const schlGrdRepository = AppDataSource.getRepository(SchoolGrades);

  const returnGrade = await grdRepository.findOneBy({
    id,
  });

  if (!returnGrade) {
    throw new appError("Grade not found", 404);
  }
    
  await grdRepository.save({
    id,
    school_subject: data.school_subject ? data.school_subject : returnGrade.school_subject,
    firstGrade: data.firstGrade ? data.firstGrade : returnGrade.firstGrade,
    secondGrade: data.secondGrade ? data.secondGrade : returnGrade.secondGrade,
    thirdGrade: data.thirdGrade ? data.thirdGrade : returnGrade.thirdGrade,
    fourthGrade: data.fourthGrade ? data.fourthGrade : returnGrade.fourthGrade,
    absences: data.absences ? data.absences : returnGrade.absences,
  });

  const resultGrade = await grdRepository.findOneBy({
    id,
  });

  //console.log(returnGrade)
  return resultGrade!;
};

export default gradeUpdateService;
