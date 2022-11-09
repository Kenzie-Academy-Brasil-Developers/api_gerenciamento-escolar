import { Request, Response } from "express";
import { ITeacherClassroomUpdate } from "../../interfaces/teacher";
import updateTeacherClassroomService from "../../services/teacher/updateTeacherClassroom.service";

const updateTeacherClassroomController = async (
  req: Request,
  res: Response
) => {
  const data: ITeacherClassroomUpdate = req.body;
  const { id } = req.params;
  const update = await updateTeacherClassroomService(data, id);

  return res.status(200).json(update);
};

export default updateTeacherClassroomController;
