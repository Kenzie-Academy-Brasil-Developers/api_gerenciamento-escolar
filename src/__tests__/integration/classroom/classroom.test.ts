import request from "supertest";
import app from "../../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-souce";

interface IClassroom {
  name: string;
  capacity: number;
}
const creatClassroom: IClassroom = {
  name: "Sala 1",
  capacity: 45,
};

describe("Tests da rota classroom", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((error) => {
        console.log(error);
      });
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /classroom -> deve ser capaz de criar uma sala de aula", async () => {
    const response = await request(app).post("/classroom").send(creatClassroom);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("capacity");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
  });

  test("POST /classroom - não podera ser possivel criação de classes com o mesmo nome", async () => {
    const response = await request(app).post("/classroom").send(creatClassroom);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });
});
