import { Request, Response } from "express";
import { IStudentLogin } from "../../interfaces/student";
import sessionService from "../../services/login/session.service";

const sessionController = async (req: Request, res: Response) => {
  const data: IStudentLogin = req.body;

  const session: string = await sessionService(data);

  return res
    .status(201)
    .json({ status: 201, message: "successfully logged in", data: session });
};

export default sessionController;
