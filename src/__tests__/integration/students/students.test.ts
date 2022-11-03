import { DataSource, Not } from "typeorm";
import AppDataSource from "../../../data-souce";
import request from "supertest";
import app from "../../../app";

interface IEditUser {
  name?: string;
  age?: number;
  email?: string;
  isTeacher?: boolean;
  contact?: string;
  id_adress?: string;

  id_classroom?: string;

  updatedAt?: Date;
}

describe("Testing the student routes", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to create an student", async () => {
    const name = "aluno1";
    const age = 14;
    const email = "aluno1@gmail.com";
    const contact = "(00)0000-0000";
    const id_adress = "";
    const id_registration = "";
    const id_classroom = "";

    const studentData = {
      name,
      age,
      email,
      contact,
      id_adress,
      id_registration,
      id_classroom,
    };

    const response = await request(app).post("/students").send(studentData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        name,
        age,
        email,
        isTeacher: false,
        contact,
        id_adress,
        id_registration,
        id_classroom,
        createdAt: Date(),
        updatedAt: Date(),
        isActive: true,
      })
    );
  });

  test("Should be able to list all students", async () => {
    const response = await request(app).get("/students");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });

  test("Should be abre to DELETE a student", async () => {
    const response = await request(app).delete("/student/:id");
    expect(response.status).toBe(200);
  });

  test("Should be able to edit a student", async () => {
    const response = await request(app).patch("/student/:id").send();

    expect(response.status).toBe(200);
  });
});
