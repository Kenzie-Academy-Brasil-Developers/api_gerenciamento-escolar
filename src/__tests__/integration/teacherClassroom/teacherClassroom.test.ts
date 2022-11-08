import AppDataSource from "../../../data-source";
import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../../app";
import {
  addressProfessional,
  addressTeacher,
  createClassroom,
  createProfessional,
  createTeacher,
  createTeacherClassroom,
  loginProfessional,
  loginTeacher,
} from "../../mocks";

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

    createClassroom.id_registration = responseProfessionals.body.data.id;
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
    expect(response.body.data).toHaveProperty("class");
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

    createClassroom.id_registration = responseProfessionals.body.data.id;
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

  test("Must be able to list all teachers classroom", async () => {
    const response = await request(app).get("/teachers/classroom");

    expect(response.status).toBe(200);
    expect(response.body.data[0]).toHaveProperty("idTeacher");
    expect(response.body.data[0]).toHaveProperty("idClassroom");
    expect(response.body.data[0]).toHaveProperty("classSchedule");
    expect(response.body.data[0]).toHaveProperty(" dayTheWeek");
  });
});
