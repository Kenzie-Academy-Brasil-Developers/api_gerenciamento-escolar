import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import {
  addressProfessional,
  createProfessional,
  loginProfessional,
} from "../../mocks";

describe("/login", () => {
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

  test("POST /login - should be able to login professional", async () => {
    const responseAddress = await request(app)
      .post("/address")
      .send(addressProfessional);
    await request(app)
      .post("/professionals")
      .send({
        ...createProfessional,
        id_address: responseAddress.body.data.id,
      });
    const response = await request(app).post("/login").send(loginProfessional);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
  });

  test("POST /login - must not be able to login with invalid email", async () => {
    const response = await request(app)
      .post("/login")
      .send({ loginProfessional, email: "testeError@gmail.com" });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Invalid email or password");
  });

  test("POST /login - must not be able to login with invalid password", async () => {
    const response = await request(app)
      .post("/login")
      .send({ loginProfessional, password: "928372" });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Invalid email or password");
  });
});
