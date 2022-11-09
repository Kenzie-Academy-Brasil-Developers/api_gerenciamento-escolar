import { Request, Response } from "express";
import testListTeacherClassroomService from "../../services/teacher/testListTeacherClassroom.service";

const testListTeacherClassroomController = async (
  req: Request,
  res: Response
) => {
  const retorno = await testListTeacherClassroomService();
  return res.status(200).json(retorno);
};

export default testListTeacherClassroomController;
