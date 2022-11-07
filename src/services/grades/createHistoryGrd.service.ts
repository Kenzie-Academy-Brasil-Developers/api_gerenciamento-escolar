import AppDataSource from "../../data-source";
import { Grades } from "../../entities/grades.entity";
import { GradesHistory } from "../../entities/gradesHistory.entity";
import { SchoolGrades } from "../../entities/schoolGrades.entity";
import { Students } from "../../entities/student.entity";
import { appError } from "../../errors/AppError";

const histGrdCreateService = async (data: GradesHistory) => {
  const { schoolGrade, student, grade } = data;

  const stdRepository = AppDataSource.getRepository(Students);
  const findStdt = await stdRepository.find();

  const grdRepository = AppDataSource.getRepository(Grades);

  const schlGrdRepository = AppDataSource.getRepository(SchoolGrades);
  const newSchGr = await schlGrdRepository.findOneBy({
    id: data.schoolGrade
  });

  if (!newSchGr) {
    throw new appError("SchoolGrade not found", 404);
  }

  const grdHstRepository = AppDataSource.getRepository(GradesHistory);
  const findHistory = await grdRepository.find();

  const newGrades = grdRepository.create(grade);
  await grdRepository.save(newGrades);

  
  const newHistory = new GradesHistory();
  newHistory.schoolGrade = newSchGr,
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
