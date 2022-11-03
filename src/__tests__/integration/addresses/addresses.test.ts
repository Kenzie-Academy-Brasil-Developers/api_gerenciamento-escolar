import AppDataSource from "../../../data-souce";
import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../../app";
import { addressTeacher } from "../../mocks";

export let mockedAddressId = "";

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

  test("POST /address - Must be able to register an address", async () => {
    const response = await request(app).post("/address").send(addressTeacher);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("district");
    expect(response.body).toHaveProperty("cep");
    expect(response.body).toHaveProperty("number");
    expect(response.body).toHaveProperty("country");
    expect(response.body).toHaveProperty("state");
    expect(response.status).toBe(201);
    mockedAddressId = response.body.id;
  });

  test("POST /address - iIt should not be possible to register an address that already exists", async () => {
    const response = await request(app).post("/address").send(addressTeacher);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
