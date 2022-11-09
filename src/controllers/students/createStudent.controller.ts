import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import createStudentService from "../../services/students/createStudent.services";

const createStudentController = async (
  request: Request,
  response: Response
) => {
  const userData = request.body;
  const student = await createStudentService(userData);
  return response.status(201).json(
    instanceToPlain({
      status: 201,
      message: "registered student successfully",
      data: student,
    })
  );
};

export default createStudentController;
