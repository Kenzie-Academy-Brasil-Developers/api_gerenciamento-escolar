import AppDataSource from "../../data-source";
import { Students } from "../../entities/student.entity";
import { Address } from "../../entities/address.entity";
import { ClassRoom } from "../../entities/classRoom.entity";
import { appError } from "../../errors/appError";
import bcrypt from "bcrypt";
import { Professionals } from "../../entities/professionals.entity";
import { SchoolGrades } from "../../entities/schoolGrades.entity";

const createStudentService = async (userData: any) => {
  const studentRepository = AppDataSource.getRepository(Students);
  const addressRepository = AppDataSource.getRepository(Address);
  const classRoomRepository = AppDataSource.getRepository(ClassRoom);
  const schoolGradeRepository = AppDataSource.getRepository(SchoolGrades);
  const professionalsRepository = AppDataSource.getRepository(Professionals);

  const emailAlreadyExists = await studentRepository.findBy({
    email: userData.email,
  });
  if (emailAlreadyExists) {
    throw new appError("email is already exists", 400);
  }

  const addressExists = await addressRepository.findBy({
    id: userData.id_address,
  });
  if (!addressExists) {
    throw new appError("invalid adress", 400);
  }

  const classRoomExists = await classRoomRepository.findBy({
    id: userData.id_classroom,
  });
  if (!classRoomExists) {
    throw new appError("invalid classroom", 400);
  }

  const schoolGradeExists = await schoolGradeRepository.findBy({
    id: userData.id_schoolGrade,
  });
  if (!schoolGradeExists) {
    throw new appError("invalid school grade", 400);
  }

  const professionalExists = await professionalsRepository.findBy({
    id: userData.id_registration,
  });
  if (!professionalExists) {
    throw new appError("invalid registration", 400);
  }

  const student = new Students();
  student.name = userData.name;
  student.age = userData.age;
  student.password = bcrypt.hashSync(userData.password, 10);
  student.contact = userData.contact;
  student.schoolGrade = schoolGradeExists[0];
  student.address = addressExists[0];
  student.classRoom = classRoomExists[0];
  student.registration = professionalExists;

  studentRepository.create(student);
  await studentRepository.save(student);

  return student;
};

export default createStudentService;
