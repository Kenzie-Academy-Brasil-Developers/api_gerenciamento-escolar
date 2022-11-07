import AppDataSource from "../../data-source";
import { Grades } from "../../entities/grades.entity";
import { GradesHistory } from "../../entities/gradesHistory.entity";
import { SchoolGrades } from "../../entities/schoolGrades.entity";
import { Students } from "../../entities/student.entity";
import { appError } from "../../errors/AppError";

const histGrdCreateService = async (data: GradesHistory) => {
  const { schoolGrade, student, grade } = data;

  const stdRepository = AppDataSource.getRepository(Students);
  const grdRepository = AppDataSource.getRepository(Grades);
  const schlGrdRepository = AppDataSource.getRepository(SchoolGrades);
  const grdHstRepository = AppDataSource.getRepository(GradesHistory);
  const findHistory = await grdRepository.find();

  const newGrades = grdRepository.create(grade);
  await grdRepository.save(newGrades);

  const existGrade = findHistory.find((grd) => grd.school_subject === data.grade.school_subject)
  if(existGrade){
    throw new appError("Grade's exists", 404)
  };
 
  const newHistory = new GradesHistory();
  newHistory.schoolGrade = schoolGrade,
  newHistory.student = student,
  newHistory.grade = newGrades;

  grdHstRepository.create(newHistory);
  
  const ret = await grdHstRepository.save(newHistory);
  return {
    status: 201,
    message: "Grades add successfully",
    data: ret,
  };
};

export default histGrdCreateService;
