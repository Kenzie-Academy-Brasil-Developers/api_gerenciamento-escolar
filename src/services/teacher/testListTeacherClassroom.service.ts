import { TeachersRoom } from "../../entities/teachersRoom.entity";
import AppDataSource from "../../data-source";

const testListTeacherClassroomService = async () => {
  const repositoryTeacherClass = AppDataSource.getRepository(TeachersRoom);

  const findteacherClass = await repositoryTeacherClass.find();

  return findteacherClass;
};

export default testListTeacherClassroomService;

//ESSA ROTA FOI CRIADA APENAS PARA REALIZAÇÃO DO TESTE DE ATUALIZAÇÃO DE TEACHER/CLASSROOM
