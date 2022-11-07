import { Request, Response } from "express";
import deleteStudentService from "../../services/students/deleteStudent.services";
const deleteStudentController = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;
  const deletedUser = await deleteStudentService(id);
  return response.status(200);
};

export default deleteStudentController;
