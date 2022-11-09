export const createProfessional = {
  type: "diretor",
  permission: true,
  name: "Profissional1",
  cpf: "12312312312",
  contact: "(00) 0000-0000",
  email: "profissional1@gmail.com",
  password: "12345678",
  id_address: "insira o id",
};

export const addressProfessional = {
  district: "Rua Heleodo Pires de camargo",
  cep: "18150000",
  number: "67",
  country: "Brasil",
  state: "MG",
};

export const loginProfessional = {
  email: "profissional1@gmail.com",
  password: "12345678",
};

export const createProfessionalIsNotAdm = {
  type: "faxineiro",
  permission: false,
  name: "Profissional2",
  cpf: "92839463820",
  contact: "(00) 0000-0000",
  email: "profissional2@gmail.com",
  password: "01234567",
  id_address: "insira o id",
};

export const addressProfessionalIsNotAdm = {
  district: "Rua dos passos",
  cep: "92639272",
  number: "20",
  country: "Brasil",
  state: "MG",
};

export const loginProfessionalIsNotAdm = {
  email: "profissional2@gmail.com",
  password: "01234567",
};

export const createTeacher = {
  name: "Professor 1",
  email: "professor1@gmail.com",
  password: "12345678",
  isTeacher: true,
  id_address: "insira o id",
  id_registration: "insira o id",
};

export const addressTeacher = {
  district: "Avenida Joaquim Honorio",
  cep: "00000000",
  number: "00",
  country: "Brasil",
  state: "SP",
};

export const loginTeacher = {
  email: "professor1@gmail.com",
  password: "12345678",
};

export const updateTeacher = {
  name: "Professor1-updated",
  email: "professor1-updated@gmail.com",
  password: "87654321",
};

export const loginTeacherUpdated = {
  email: "professor1-updated@gmail.com",
  password: "87654321",
};

export const createStudent = {
  name: "aluno1",
  age: 14,
  email: "aluno1@gmail.com",
  password: "12345678",
  contact: "(00) 0000-0000",
  id_schoolGrade: "Insira o id",
  id_address: "insira o id",
  id_registration: "insira o id",
  id_classroom: "insira o id",
};

export const addressStudent = {
  district: "Rua dos Estudantes",
  cep: "12345678",
  number: "12",
  country: "Brasil",
  state: "RJ",
};

export const loginStudent = {
  email: "aluno1@gmail.com",
  password: "12345678",
};

export const updateStudent = {
  name: "aluno1-atualizado",
  age: 20,
  email: "aluno1-atualizado@gmail.com",
  password: "87654321",
  contact: "(11) 1111-1111",
};

export const loginStudentUpdated = {
  email: "aluno1-atualizado@gmail.com",
  password: "87654321",
};

export const createAddress = {
  district: "Rua Pires camargo",
  cep: "90232200",
  number: "05",
  country: "Brasil",
  state: "SP",
};

export const createClassroom = {
  name: "sala 1",
  capacity: 45,
  id_schoolGrade: "insira o id",
};

export const updateClassroom = {
  name: "sala 1 - updated",
  capacity: 40,
};

export const createSchoolMaterials = {
  school_subject: "Matematica",
  firstGrade: 21,
  secondGrade: 15,
  thirdGrade: 25,
  fourthGrade: null,
  absences: 4,
};

export const updateSchoolMaterials = {
  fourthGrade: 24,
  absences: 8,
};

export const createSchoolGrade = {
  name: "1º ano - Ensino Medio",
  id_registration: "insira o id",
};

export const createTeacherClassroom = {
  idTeacher: "insira o Id do professor",
  idClassroom: "insira o Id da sala",
  classSchedule: "12:30",
  dayTheWeek: "seg",
};
