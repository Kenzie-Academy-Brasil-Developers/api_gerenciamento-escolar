import AppDataSource from "../../data-source";
import { TeachersRoom } from "../../entities/teachersRoom.entity";

const listTeacherClassroomService = async () => {
  const repositoryTeacherClasroom = AppDataSource.getRepository(TeachersRoom);
  const teacherClassroom = repositoryTeacherClasroom.find();

  return {
    status: 200,
    message: "search performed successfully",
    data: teacherClassroom,
  };
};
export default listTeacherClassroomService;
