import { hashSync } from "bcryptjs";
import AppDataSource from "../../data-source";
import { Teachers } from "../../entities/teachers.entity";
import { appError } from "../../errors/appError";
import { ITeacherUpdate } from "../../interfaces/teacher";

const updateTeacherService = async (data: ITeacherUpdate, id: any) => {
  const { email, name, password } = data;

  const teacherRepository = AppDataSource.getRepository(Teachers);

  const findTeacher = await teacherRepository.findOneBy({
    id,
  });

  const verifyData = Object.keys(data);

  if (
    verifyData.includes("id") ||
    verifyData.includes("isActive") ||
    verifyData.includes("isTeacher") ||
    verifyData.includes("id_registration")
  ) {
    throw new appError(
      "unable to update id, isActive, isTeacher, id_registration",
      400
    );
  }

  if (!findTeacher) {
    throw new appError("teacher not found", 404);
  }

  await teacherRepository.update(id, {
    name: name ? name : findTeacher.name,
    email: email ? email : findTeacher.email,
    password: password ? hashSync(password, 10) : findTeacher.password,
  });

  const teacher = await teacherRepository.findOneBy({
    id,
  });

  const teacherReturn = {
    id: teacher?.id,
    name: teacher?.name,
    email: teacher?.email,
    isActive: teacher?.isActive,
    isTeacher: teacher?.isTeacher,
    createdAt: teacher?.createdAt,
    updatedAt: teacher?.updatedAt,
  };

  return {
    status: 200,
    message: "updated teacher successfully",
    data: teacherReturn,
  };
};
export default updateTeacherService;
