import { Request, Response } from "express";
import updateStudentService from "../../services/students/updateStudent.services";
const updateStudentController = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;
  const userData = request.body;

  const updatedStudent = await updateStudentService(id, userData);
  return response.status(200).json(updatedStudent);
};

export default updateStudentController;
