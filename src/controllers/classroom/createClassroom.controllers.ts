import { Request, Response } from "express";
import { IClassRoomRequest } from "../../interfaces/classRoom";
import { createClassroomService } from "../../services/classroom/createClassroom.service";
import { deleteClassroomService } from "../../services/classroom/deleteClassroom.service";
import { listClassroomService } from "../../services/classroom/listClassroom.service";
import { listTeacherClassroomService } from "../../services/classroom/listTeacherClassroom.service";
import { updateClassroomService } from "../../services/classroom/updateClassroom.service";
import listTeachersService from "../../services/teacher/listTeachers.service";

export const createClassroomController = async (
  req: Request,
  res: Response
) => {
  const classRoom: IClassRoomRequest = req.body;
  const { id_schoolGrade } = req.body;
  const createdClassroom = await createClassroomService(classRoom);

  return res.status(201).json({
    message: "classroom created successfully",
    data: { ...createdClassroom, id_schoolGrade },
  });
};

export const listClassroomController = async (req: Request, res: Response) => {
  const classrooms = await listClassroomService();

  return res.status(200).json({
    data: classrooms,
    message: "search performed successfully",
  });
};

export const listClassroomTeacherController = async (
  req: Request,
  res: Response
) => {
  const idTeacher = req.params.id;
  const findTeacherClassroom = listTeacherClassroomService(idTeacher);

  return res.status(200).json({
    message: "search performed successfully",
    data: findTeacherClassroom,
  });
};

export const updateClassroomController = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  const data = req.body;
  delete data.decodifiedToken;

  const updatedClassroom = await updateClassroomService(id, data);
  return res.status(200).json({
    message: "updated classroom successfully",
    data: updatedClassroom,
  });
};

export const deleteClassroomController = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;

  await deleteClassroomService(id);

  return res.status(204).send();
};
