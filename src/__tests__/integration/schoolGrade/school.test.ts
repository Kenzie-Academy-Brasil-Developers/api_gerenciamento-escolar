import AppDataSource from "../../../data-source";
import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../../app";
import {
  addressProfessional,
  addressProfessionalIsNotAdm,
  addressTeacher,
  createProfessional,
  createProfessionalIsNotAdm,
  createSchoolGrade,
  loginProfessional,
  loginProfessionalIsNotAdm,
} from "../../mocks";

describe("Test SchoolGrade routes", () => {
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
    const address = await request(app)
      .post("/address")
      .send(addressProfessional);
    createProfessional.id_address = address.body.data.id;
    const createProfessionalAdm = await request(app)
      .post("/professionals")
      .send(createProfessional);
    const loginProfessionalAdm = await request(app)
      .post("/login")
      .send(loginProfessional);

    createSchoolGrade.id_registration = createProfessionalAdm.body.data.id;
    const response = await request(app)
      .post("/schoolGrade")
      .set("Authorization", `Bearer ${loginProfessionalAdm.body.data}`)
      .send(createSchoolGrade);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
    expect(response.body.data).toHaveProperty("name");
    expect(response.body.data).toHaveProperty("createdAt");
    expect(response.body.data).toHaveProperty("updatedAt");
    expect(response.body.data).toHaveProperty("id");
  });
  test("Must not be able to create a new school grade with the same name", async () => {
    createProfessional.email = "professional2@gmail.com";
    createProfessional.cpf = "12208513366";
    const address = await request(app).post("/address").send(addressTeacher);
    createProfessional.id_address = address.body.data.id;
    const createProfessionalAdm = await request(app)
      .post("/professionals")
      .send(createProfessional);
    const loginProfessionalAdm = await request(app)
      .post("/login")
      .send(loginProfessional);

    createSchoolGrade.id_registration = createProfessionalAdm.body.data.id;
    console.log(loginProfessionalAdm.body);

    const response = await request(app)
      .post("/schoolGrade")
      .set("Authorization", `Bearer ${loginProfessionalAdm.body.data}`)
      .send(createSchoolGrade);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("Must not be able to create a new school grade without autentication", async () => {
    addressProfessional.number = "12";
    createProfessional.email = "professional3@gmail.com";
    createProfessional.cpf = "10019032177";
    const address = await request(app)
      .post("/address")
      .send(addressProfessional);
    createProfessional.id_address = address.body.data.id;
    const createProfessionalAdm = await request(app)
      .post("/professionals")
      .send(createProfessional);
    await request(app).post("/professionals/login").send(loginProfessional);

    createSchoolGrade.id_registration = createProfessionalAdm.body.data.id;

    const response = await request(app)
      .post("/schoolGrade")
      .send(createSchoolGrade);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("Must not be able to create a new school grade without adm permission", async () => {
    const address = await request(app)
      .post("/address")
      .send(addressProfessionalIsNotAdm);
    createProfessionalIsNotAdm.id_address = address.body.data.id;
    const professionalIsNotAdm = await request(app)
      .post("/professionals")
      .send(createProfessionalIsNotAdm);
    const professionalIsNotAdmLogin = await request(app)
      .post("/login")
      .send(loginProfessionalIsNotAdm);

    createSchoolGrade.id_registration = professionalIsNotAdm.body.data.id;

    const response = await request(app)
      .post("/schoolGrade")
      .set("Authorization", `Bearer ${professionalIsNotAdmLogin.body.token}`)
      .send(createSchoolGrade);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});
