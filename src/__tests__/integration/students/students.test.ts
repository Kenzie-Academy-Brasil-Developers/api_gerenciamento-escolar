import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  createStudent,
  loginStudent,
  updateStudent,
  addressStudent,
  createProfessional,
  createSchoolGrade,
  createClassroom,
  loginProfessional,
} from "../../mocks";

describe("Testing the student routes", () => {
  let connection: DataSource;
  let userId = {};

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res: any) => (connection = res))
      .catch((err: any) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to create an student", async () => {
    const {
      name,
      age,
      email,
      contact,
      id_address,
      id_registration,
      id_classroom,
    } = createStudent;
    const responseAddress = await request(app)
      .post("/address")
      .send(addressStudent);
    const responseProfessional = await request(app)
      .post("/professionals")
      .send({
        ...createProfessional,
        id_address: responseAddress.body.data.id,
      });

    const responseLoginProfessional = await request(app)
      .post("/login")
      .send(loginProfessional);

    const responseSchoolGrade = await request(app)
      .post("/schoolGrade")
      .set("Authorization", `Bearer ${responseLoginProfessional.body.data}`)
      .send({
        ...createSchoolGrade,
        id_registration: responseProfessional.body.data.id,
      });

    const classRoom = {
      ...createClassroom,
      id_registration: responseProfessional.body.data.id,
      id_schoolGrade: responseSchoolGrade.body.data.id,
    };

    const responseClassRoom = await request(app)
      .post("/classroom")
      .set("Authorization", `Bearer ${responseLoginProfessional.body.data}`)
      .send(classRoom);

    const response = await request(app)
      .post("/students")
      .send({
        ...createStudent,
        id_address: responseAddress.body.data.id,
        id_registration: responseProfessional.body.data.id,
        id_classroom: responseClassRoom.body.id,
        id_schoolGrade: responseSchoolGrade.body.data.id,
      });

    userId = response;
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("id");
  });

  test("Should be able to list all students", async () => {
    const responseLoginProfessional = await request(app)
      .post("/login")
      .send(loginProfessional);

    console.log("testando", responseLoginProfessional.body.data);
    const response = await request(app).get("/students");
    // .set("Authorization", `Bearer ${responseLoginProfessional.body.data}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("map");
  });

  test("Should be abre to DELETE a student", async () => {
    const response = await request(app).delete("/student/:id");
    expect(response.status).toBe(200);
  });

  test("Should be able to update a student", async () => {
    const { name, age, email, contact, password } = updateStudent;
    const response = await request(app)
      .patch("/student/:id")
      .send(updateStudent);

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(
      expect.objectContaining({ name, age, email, contact, password })
    );
  });

  test("Should be able to login as a student", async () => {
    const response = await await request(app).post("/login").send(loginStudent);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("token");
  });
});
