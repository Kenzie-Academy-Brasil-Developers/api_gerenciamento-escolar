import { compare } from "bcryptjs";
import AppDataSource from "../../data-source";
import { Professionals } from "../../entities/professionals.entity";
import { Students } from "../../entities/student.entity";
import { Teachers } from "../../entities/teachers.entity";
import { appError } from "../../errors/appError";
import { IStudentLogin } from "../../interfaces/student";
import jwt from "jsonwebtoken";
import "dotenv/config";

const sessionService = async (data: IStudentLogin) => {
  const teacherRepository = AppDataSource.getRepository(Teachers);
  const professionalRepository = AppDataSource.getRepository(Professionals);
  const studentRepository = AppDataSource.getRepository(Students);

  const userTeacher = await teacherRepository.findOneBy({ email: data.email });
  const userProfessional = await professionalRepository.findOneBy({
    email: data.email,
  });
  const userStudent = await studentRepository.findOneBy({ email: data.email });

  const user = userTeacher
    ? userTeacher
    : userProfessional
    ? userProfessional
    : userStudent
    ? userStudent
    : undefined;

  if (!user) {
    throw new appError("Invalid email or password", 404);
  }

  const validPassword = await compare(data.password, user.password);

  if (!validPassword) {
    throw new appError("Invalid email or password", 404);
  }

  const token = jwt.sign(
    { email: user.email },
    process.env.SECRET_KEY as string,
    { expiresIn: "24h", subject: user.id }
  );

  return token;
};

export default sessionService;
