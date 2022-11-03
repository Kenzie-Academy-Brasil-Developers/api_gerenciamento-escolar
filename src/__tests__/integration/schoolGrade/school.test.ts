import AppDataSource from "../../../data-souce";
import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../../app";
import {
  createProfessional,
  createProfessionalIsNotAdm,
  createSchoolGrade,
  loginProfessional,
  loginProfessionalIsNotAdm,
} from "../../mocks";

describe("/address", () => {
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

  test("Must be able to create a new school grade", async () => {
    await request(app).post("/professionals").send(createProfessional);
    const loginProfessionalAdm = await request(app)
      .post("/professionals/login")
      .send(loginProfessional);

    const response = await request(app)
      .post("/schoolGrade")
      .set("Authorization", ` Bearer ${loginProfessionalAdm.body.token}`)
      .send(createSchoolGrade);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
    expect(response.body.data).toHaveProperty("name");
    expect(response.body.data).toHaveProperty("id_registration");
    expect(response.body.data).toHaveProperty("createdAt");
    expect(response.body.data).toHaveProperty("updatedAt");
    expect(response.body.data).toHaveProperty("id");
  });
  test("Must not be able to create a new school grade with the same name", async () => {
    await request(app).post("/professionals").send(createProfessional);
    const loginProfessionalAdm = await request(app)
      .post("/professionals/login")
      .send(loginProfessional);

    const response = await request(app)
      .post("/schoolGrade")
      .set("Authorization", ` Bearer ${loginProfessionalAdm.body.token}`)
      .send(createSchoolGrade);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("Must not be able to create a new school grade without autentication", async () => {
    await request(app).post("/professionals").send(createProfessional);
    const loginProfessionalAdm = await request(app)
      .post("/professionals/login")
      .send(loginProfessional);

    const response = await request(app)
      .post("/schoolGrade")
      .send(createSchoolGrade);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("Must not be able to create a new school grade without adm permission", async () => {
    await request(app).post("/professionals").send(createProfessionalIsNotAdm);
    const professionalIsNotAdmLogin = await request(app)
      .post("/professionals/login")
      .send(loginProfessionalIsNotAdm);

    const response = await request(app)
      .post("/schoolGrade")
      .set("Authorization", ` Bearer ${professionalIsNotAdmLogin.body.token}`)
      .send(createSchoolGrade);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});
