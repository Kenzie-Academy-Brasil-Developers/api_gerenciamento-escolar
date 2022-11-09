import { Request, Response } from "express";
import listAllStudentsService from "../../services/students/listAllStudents.services";

const listAllStudentsController = async (
  request: Request,
  response: Response
) => {
  const students = await listAllStudentsService();
  console.log("students console", students);
  console.log("responseLog", response);
  return response.json(students);
};

export default listAllStudentsController;
