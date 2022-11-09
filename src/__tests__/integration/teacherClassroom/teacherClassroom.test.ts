import AppDataSource from "../../../data-source";
import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../../app";
import {
  addressProfessional,
  addressTeacher,
  createClassroom,
  createProfessional,
  createSchoolGrade,
  createTeacher,
  createTeacherClassroom,
  loginProfessional,
  loginTeacher,
} from "../../mocks";
import { createClassroomController } from "../../../controllers/classroom/createClassroom.controllers";

describe("Test TecaherClassroom routes", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /teacherClassroom - Must be able to create new teacher classroom", async () => {
    const responseAddressProfessional = await request(app)
      .post("/address")
      .send(addressProfessional);

    createProfessional.id_address = responseAddressProfessional.body.data.id;

    const responseProfessionals = await request(app)
      .post("/professionals")
      .send(createProfessional);

    const professionalLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);

    const addressTeacher1 = await request(app)
      .post("/address")
      .send(addressTeacher);
    createTeacher.id_address = addressTeacher1.body.data.id;
    createTeacher.id_registration = responseProfessionals.body.data.id;

    const createTeacher1 = await request(app)
      .post("/teacher")
      .send(createTeacher)
      .set("Authorization", `Bearer ${professionalLoginResponse.body.data}`);
    const loginTeacher1 = await request(app).post("/login").send(loginTeacher);

    createSchoolGrade.id_registration = responseProfessionals.body.data.id;
    const responseSchoolGrade = await request(app)
      .post("/schoolGrade")
      .set("Authorization", `Bearer ${professionalLoginResponse.body.data}`)
      .send(createSchoolGrade);

    createClassroom.id_schoolGrade = responseSchoolGrade.body.data.id;
    const createdClassroomResponse = await request(app)
      .post("/classroom")
      .set("Authorization", `Bearer ${professionalLoginResponse.body.data}`)
      .send(createClassroom);

    createTeacherClassroom.idClassroom = createdClassroomResponse.body.data.id;
    createTeacherClassroom.idTeacher = createTeacher1.body.data.id;
    const response = await request(app)
      .post("/teacher/classroom")
      .send(createTeacherClassroom)
      .set("Authorization", `Bearer ${professionalLoginResponse.body.data}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
    expect(response.body.data).toHaveProperty("teacher");
    expect(response.body.data).toHaveProperty("dayTheWeek");
    expect(response.body.data).toHaveProperty("classSchedule");
    expect(response.body.data).toHaveProperty("classRoom");
  });

  test("POST /teacherClassroom - Must not be able to create new teacher classroom without authorization", async () => {
    addressProfessional.number = "122";
    const responseAddressProfessional = await request(app)
      .post("/address")
      .send(addressProfessional);

    createProfessional.id_address = responseAddressProfessional.body.data.id;
    createProfessional.email = "professional1@gmail.com";

    const responseProfessionals = await request(app)
      .post("/professionals")
      .send(createProfessional);

    loginProfessional.email = "professional1@gmail.com";
    const professionalLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);

    addressTeacher.number = "187";
    const addressTeacher1 = await request(app)
      .post("/address")
      .send(addressTeacher);
    createTeacher.id_address = addressTeacher1.body.data.id;
    createTeacher.id_registration = responseProfessionals.body.data.id;
    createTeacher.email = "teacher3@gmail.com";
    loginTeacher.email = "teacher3@gmail.com";

    const createTeacher1 = await request(app)
      .post("/teacher")
      .send(createTeacher)
      .set("Authorization", `Bearer ${professionalLoginResponse.body.data}`);
    const loginTeacher1 = await request(app).post("/login").send(loginTeacher);

    createSchoolGrade.id_registration = responseProfessionals.body.data.id;
    createSchoolGrade.name = "nome qualquer";
    const responseSchoolGrade = await request(app)
      .post("/schoolGrade")
      .set("Authorization", `Bearer ${professionalLoginResponse.body.data}`)
      .send(createSchoolGrade);

    createClassroom.id_schoolGrade = responseSchoolGrade.body.data.id;
    createClassroom.name = "terceira série";
    const createdClassroomResponse = await request(app)
      .post("/classroom")
      .set("Authorization", `Bearer ${professionalLoginResponse.body.data}`)
      .send(createClassroom);

    createTeacherClassroom.idClassroom = createdClassroomResponse.body.data.id;
    createTeacherClassroom.idTeacher = createTeacher1.body.data.id;
    const response = await request(app)
      .post("/teacher/classroom")
      .send(createTeacherClassroom);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH- teacher/classroom - Must be able to update a teacherClass", async () => {
    addressProfessional.number = "123";
    const responseAddressProfessional = await request(app)
      .post("/address")
      .send(addressProfessional);

    createProfessional.id_address = responseAddressProfessional.body.data.id;
    createProfessional.email = "professional7@gmail.com";

    const responseProfessionals = await request(app)
      .post("/professionals")
      .send(createProfessional);

    loginProfessional.email = "professional7@gmail.com";
    const professionalLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);

    addressTeacher.number = "188";
    const addressTeacher1 = await request(app)
      .post("/address")
      .send(addressTeacher);
    createTeacher.id_address = addressTeacher1.body.data.id;
    createTeacher.id_registration = responseProfessionals.body.data.id;
    createTeacher.email = "teacher4@gmail.com";
    loginTeacher.email = "teacher4@gmail.com";

    const createTeacher1 = await request(app)
      .post("/teacher")
      .send(createTeacher)
      .set("Authorization", `Bearer ${professionalLoginResponse.body.data}`);
    const loginTeacher1 = await request(app).post("/login").send(loginTeacher);

    createSchoolGrade.id_registration = responseProfessionals.body.data.id;
    createSchoolGrade.name = "nome da School Grade";
    const responseSchoolGrade = await request(app)
      .post("/schoolGrade")
      .set("Authorization", `Bearer ${professionalLoginResponse.body.data}`)
      .send(createSchoolGrade);

    createClassroom.id_schoolGrade = responseSchoolGrade.body.data.id;
    createClassroom.name = "sexta série";
    const createdClassroomResponse = await request(app)
      .post("/classroom")
      .set("Authorization", `Bearer ${professionalLoginResponse.body.data}`)
      .send(createClassroom);

    const getTeacherClassroom = await request(app).get(
      "/teacher/classroom/test"
    );

    createTeacherClassroom.classSchedule = "14:00";
    createTeacherClassroom.dayTheWeek = "Qua";
    const response = await request(app)
      .patch(`/teacher/classroom/${getTeacherClassroom.body[0].id}`)
      .send(createTeacherClassroom)
      .set("Authorization", `Bearer ${professionalLoginResponse.body.data}`);

    expect(response.body).toHaveProperty("message");
    expect(response.body.data.classSchedule).toEqual("14:00");
    expect(response.body.data.dayTheWeek).toEqual("Qua");
  });

  test("PATCH- teacher/classroom - Must not be able to update a teacherClass whithout authentication", async () => {
    addressProfessional.number = "120";
    const responseAddressProfessional = await request(app)
      .post("/address")
      .send(addressProfessional);

    createProfessional.id_address = responseAddressProfessional.body.data.id;
    createProfessional.email = "professional6@gmail.com";

    const responseProfessionals = await request(app)
      .post("/professionals")
      .send(createProfessional);

    loginProfessional.email = "professional6@gmail.com";
    const professionalLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);

    addressTeacher.number = "185";
    const addressTeacher1 = await request(app)
      .post("/address")
      .send(addressTeacher);
    createTeacher.id_address = addressTeacher1.body.data.id;
    createTeacher.id_registration = responseProfessionals.body.data.id;
    createTeacher.email = "teacher9@gmail.com";
    loginTeacher.email = "teacher9@gmail.com";

    const createTeacher1 = await request(app)
      .post("/teacher")
      .send(createTeacher)
      .set("Authorization", `Bearer ${professionalLoginResponse.body.data}`);
    const loginTeacher1 = await request(app).post("/login").send(loginTeacher);

    createSchoolGrade.id_registration = responseProfessionals.body.data.id;
    createSchoolGrade.name = "nome da School";
    const responseSchoolGrade = await request(app)
      .post("/schoolGrade")
      .set("Authorization", `Bearer ${professionalLoginResponse.body.data}`)
      .send(createSchoolGrade);

    createClassroom.id_schoolGrade = responseSchoolGrade.body.data.id;
    createClassroom.name = "oitava série";
    const createdClassroomResponse = await request(app)
      .post("/classroom")
      .set("Authorization", `Bearer ${professionalLoginResponse.body.data}`)
      .send(createClassroom);

    const getTeacherClassroom = await request(app).get(
      "/teacher/classroom/test"
    );

    createTeacherClassroom.classSchedule = "15:00";
    createTeacherClassroom.dayTheWeek = "Sex";
    const response = await request(app)
      .patch(`/teacher/classroom/${getTeacherClassroom.body[0].id}`)
      .send(createTeacherClassroom);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE -  teacher/classroom - Must not be able to delete a teacher classroom without authorization", async () => {
    loginProfessional.email = "professional6@gmail.com";
    const professionalLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);
    const getTeacherClassroom = await request(app).get(
      "/teacher/classroom/test"
    );
    const response = await request(app).delete(
      `/teacher/classroom/${getTeacherClassroom.body[0].id}`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE -  teacher/classroom - Must be able to delete a teacher classroom", async () => {
    loginProfessional.email = "professional6@gmail.com";
    const professionalLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);
    const getTeacherClassroom = await request(app).get(
      "/teacher/classroom/test"
    );
    const response = await request(app)
      .delete(`/teacher/classroom/${getTeacherClassroom.body[0].id}`)
      .set("Authorization", `Bearer ${professionalLoginResponse.body.data}`);

    expect(response.status).toBe(204);
  });
});
