import { Request, Response } from "express";
import listAllStudentsService from "../../services/students/listAllStudents.services";

const listAllStudentsController = async (
  response: Response,
  request: Request
) => {
  const students = await listAllStudentsService();
  return response.status(200).json({
    status: 200,
    message: "search performed successfully",
    data: students,
  });
};

export default listAllStudentsController;
