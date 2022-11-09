import AppDataSource from "../../data-source";
import { TeachersRoom } from "../../entities/teachersRoom.entity";
import { appError } from "../../errors/appError";
import { ITeacherClassroomUpdate } from "../../interfaces/teacher";

const updateTeacherClassroomService = async (
  data: ITeacherClassroomUpdate,
  id: any
) => {
  const { classSchedule, dayTheWeek } = data;
  const teacherClassRepository = AppDataSource.getRepository(TeachersRoom);
  const teacherClass = await teacherClassRepository.findOneBy({
    id: id,
  });

  if (!teacherClass) {
    throw new appError("teacher class not found", 404);
  }

  await teacherClassRepository.update(id, {
    classSchedule: classSchedule ? classSchedule : teacherClass.classSchedule,
    dayTheWeek: dayTheWeek ? dayTheWeek : teacherClass.dayTheWeek,
  });

  const toReturn = await teacherClassRepository.findOneBy({
    id,
  });

  return {
    status: 200,
    message: "update!",
    data: toReturn,
  };
};
export default updateTeacherClassroomService;
