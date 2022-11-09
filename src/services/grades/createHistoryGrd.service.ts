import AppDataSource from "../../data-source";
import { Grades } from "../../entities/grades.entity";
import { GradesHistory } from "../../entities/gradesHistory.entity";
import { SchoolGrades } from "../../entities/schoolGrades.entity";
import { Students } from "../../entities/student.entity";
import { IGradesHistoryRequest } from "../../interfaces/schoolGrades";
import { appError } from "../../errors/appError";

const histGrdCreateService = async (data: IGradesHistoryRequest) => {
  const { schoolGrade, student, grade } = data;

  const schlGrdRepository = AppDataSource.getRepository(SchoolGrades);
  const newSchGr = await schlGrdRepository.findOneBy({
    id: schoolGrade,
  });
  if (!newSchGr) {
    throw new appError("SchoolGrade not found", 404);
  }

  const stdRepository = AppDataSource.getRepository(Students);
  const findStdt = await stdRepository.findOneBy({
    id: student,
  });
  if (!findStdt) {
    throw new appError("Not found student", 400);
  }

  const grdRepository = AppDataSource.getRepository(Grades);

  const grdHstRepository = AppDataSource.getRepository(GradesHistory);
  const findHistory = await grdRepository.find();

  const newGrades = grdRepository.create(grade);
  await grdRepository.save(newGrades);

  const newHistory = new GradesHistory();
  (newHistory.schoolGrade = newSchGr),
    (newHistory.student = findStdt),
    (newHistory.grade = newGrades);

  grdHstRepository.create(newHistory);

  const ret = await grdHstRepository.save(newHistory);
  return {
    status: 201,
    message: "Grades add successfully",
    data: ret,
  };
};

export default histGrdCreateService;
