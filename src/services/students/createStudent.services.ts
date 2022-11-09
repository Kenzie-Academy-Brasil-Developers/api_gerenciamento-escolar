import AppDataSource from "../../data-source";
import { Students } from "../../entities/student.entity";
import { Address } from "../../entities/address.entity";
import { ClassRoom } from "../../entities/classRoom.entity";
import { appError } from "../../errors/appError";
import { hash } from "bcryptjs";
import { Professionals } from "../../entities/professionals.entity";
import { SchoolGrades } from "../../entities/schoolGrades.entity";

const createStudentService = async (userData: any) => {
  const studentRepository = AppDataSource.getRepository(Students);
  const addressRepository = AppDataSource.getRepository(Address);
  const classRoomRepository = AppDataSource.getRepository(ClassRoom);
  const schoolGradeRepository = AppDataSource.getRepository(SchoolGrades);
  const professionalsRepository = AppDataSource.getRepository(Professionals);

  const emailAlreadyExists = await studentRepository.findOneBy({
    email: userData.email,
  });
  if (emailAlreadyExists) {
    throw new appError("email is already exists", 401);
  }

  const addressExists = await addressRepository.findOneBy({
    id: userData.id_address,
  });
  if (!addressExists) {
    throw new appError("invalid adress", 401);
  }

  const classRoomExists = await classRoomRepository.findOneBy({
    id: userData.id_classroom,
  });
  if (!classRoomExists) {
    throw new appError("invalid classroom", 340);
  }

  const schoolGradeExists = await schoolGradeRepository.findOneBy({
    id: userData.id_schoolGrade,
  });

  if (!schoolGradeExists) {
    throw new appError("invalid school grade", 401);
  }

  const professionalExists = await professionalsRepository.findOneBy({
    id: userData.id_registration,
  });
  
  if (!professionalExists) {
    throw new appError("invalid registration", 401);
  }

  // const student = new Students();
  // student.name = userData.name;
  // student.age = userData.age;
  // student.password = await hash(userData.password, 10);
  // student.contact = userData.contact;
  // student.schoolGrade = schoolGradeExists;
  // student.address = addressExists;
  // student.classRoom = classRoomExists;
  // student.registration = [professionalExists];

  const student = studentRepository.create({
    name: userData.name,
    age: userData.age,
    password: await hash(userData.password, 10),
    contact: userData.contact,
    schoolGrade: schoolGradeExists,
    address: addressExists,
    classRoom: classRoomExists,
    registration: professionalExists,
    email: userData.email,
  });
  await studentRepository.save(student);

  return student;
};

export default createStudentService;
