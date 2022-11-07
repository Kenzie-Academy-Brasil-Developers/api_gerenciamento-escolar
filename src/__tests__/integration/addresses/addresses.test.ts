import AppDataSource from "../../../data-source";
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

    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("district");
    expect(response.body.data).toHaveProperty("cep");
    expect(response.body.data).toHaveProperty("number");
    expect(response.body.data).toHaveProperty("country");
    expect(response.body.data).toHaveProperty("state");
    expect(response.status).toBe(201);
    mockedAddressId = response.body.data.id;
  });

  test("POST /address - iIt should not be possible to register an address that already exists", async () => {
    const response = await request(app).post("/address").send(addressTeacher);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
