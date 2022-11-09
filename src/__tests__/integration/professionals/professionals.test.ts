import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import { addressProfessional, createProfessional } from "../../mocks";

describe("/professionals", () => {
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

  test("POST /professionals - Must be able to register a professional ", async () => {
    const responseAddress = await request(app)
      .post("/address")
      .send(addressProfessional);

    const response = await request(app)
      .post("/professionals")
      .send({
        ...createProfessional,
        id_address: responseAddress.body.data.id,
      });

    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("name");
    expect(response.body.data).toHaveProperty("email");
    expect(response.body.data).toHaveProperty("type");
    expect(response.body.data).toHaveProperty("id_address");
    expect(response.body.data).toHaveProperty("cpf");
    expect(response.body.data).toHaveProperty("permission");
    expect(response.body.data).toHaveProperty("contact");
    expect(response.body.data).toHaveProperty("createdAt");
    expect(response.body.data).toHaveProperty("updatedAt");
    expect(response.body.data).toHaveProperty("isActive");
    expect(response.body.data).not.toHaveProperty("password");

    expect(response.body.data.name).toEqual("Profissional1");
    expect(response.body.data.email).toEqual("profissional1@gmail.com");
    expect(response.body.data.isActive).toEqual(true);
    expect(response.status).toBe(201);
  });

  test("POST /professionals - Should not be able to register a teacher that already exists", async () => {
    const response = await request(app)
      .post("/professionals")
      .send(createProfessional);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });
});
