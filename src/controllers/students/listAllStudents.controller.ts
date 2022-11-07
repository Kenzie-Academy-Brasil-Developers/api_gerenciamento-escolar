import { Request, response, Response } from "express";
import listAllStudentsService from "../../services/students/listAllStudents.services";

const listAllStudentsController = async () => {
  const students = await listAllStudentsService();
  return response.status(200).json(students);
};

export default listAllStudentsController;
