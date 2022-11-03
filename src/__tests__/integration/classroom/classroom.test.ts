import request from "supertest";
import app from "../../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-souce";
import {
  createProfessional,
  createProfessionalIsNotAdm,
  loginProfessional,
  createClassroom,
  createTeacher,
  loginTeacher,
  loginProfessionalIsNotAdm,
} from "../../mocks";

describe("/classroom", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((error) => {
        console.log(error);
      });

    await request(app).post("/professionals").send(createProfessional);

    await request(app).post("/professionals").send(createProfessionalIsNotAdm);
  });

  afterAll(async () => {
    await connection.destroy();
  });
  /*--------------TESTES DA ROTA CLASSROOM /POST--------------*/
  test("POST /classroom -> should be able to create a classroom", async () => {
    const directorLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);

    const response = await request(app)
      .post("/classroom")
      .set("Authorization", `Bearer ${directorLoginResponse.body.data.token}`)
      .send(createClassroom);

    expect(response.status).toBe(201);
    expect(response.body.message).toHaveProperty(
      "classroom created successfully"
    );
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("name");
    expect(response.body.data).toHaveProperty("capacity");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("createdAt");
    expect(response.body.data).toHaveProperty("updatedAt");
  });

  test("POST /classroom - not be able to create a classroom without permission", async () => {
    const response = await request(app)
      .post("/classroom")
      .send(createClassroom);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("POST /classroom - not be able to create a classroom with the same name", async () => {
    const response = await request(app)
      .post("/classroom")
      .send(createClassroom);

    expect(response.body.message).toHaveProperty(
      "there is already a room with the same name"
    );
    expect(response.status).toBe(400);
  });

  /*--------------*TESTES DA ROTA CLASSROOM /GET*--------------*/

  test("GET /classroom - should be list all classrooms", async () => {
    const response = await request(app).get("/classroom");

    expect(response.status).toBe(200);
    expect(response.body.message).toHaveProperty(
      "search performed successfully"
    );
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test("GET /classroom/:id_teacher/teacher - should be search teatcher's classroom", async () => {
    const createProfessorResponse = await request(app)
      .post("/professionals")
      .send(createTeacher);
    const loginResponse = await request(app).post("/login").send(loginTeacher);

    const response = await request(app)
      .get(`/classroom/${createProfessorResponse.body.data.id}/teacher`)
      .set("Authorization", `Bearer ${loginResponse.body.data.token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toHaveProperty(
      "search performed successfully"
    );
    expect(response.body).toHaveProperty("data");
  });

  test("GET /classroom/:id_teacher/teacher - should not be able to search teacher's classroom without permission or token", async () => {
    const createProfessorResponse = await request(app)
      .post("/professionals")
      .send(createTeacher);
    const loginResponse = await request(app).post("/login").send(loginTeacher);
    const response = await request(app).get(
      `/classroom/${createProfessorResponse.body.data.id}/teacher`
    );

    expect(response.status).toBe(401);
    expect(response.body.message).toHaveProperty(
      "Invalid token or not have permission"
    );
  });

  /**--------------TESTES DA ROTA CLASSROOM /update*--------------*/

  test("PATCH /classroom/:id -> should not be able to update a classroom without permission", async () => {
    const simplePermissionProfessional = await request(app)
      .post("/login")
      .send(loginProfessionalIsNotAdm);
    const directorLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);
    await request(app)
      .post("/classroom")
      .set("Authorization", `Bearer ${directorLoginResponse.body.data.token}`)
      .send(createClassroom);
    const updateClassroom = await request(app).get("/classroom");
    const response = await request(app)
      .patch(`/classroom/${updateClassroom.body.data[0].id}`)
      .set(
        "Authorization",
        `Bearer ${simplePermissionProfessional.body.data.token}`
      )
      .send(updateClassroom);

    expect(response.body.message).toHaveProperty(
      "You must be logged in as admin professional"
    );
    expect(response.status).toBe(401);
  });

  test("PATCH /classroom/:id -> should not be able to update a classroom with invalid token", async () => {
    const directorLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);
    await request(app)
      .post("/classroom")
      .set("Authorization", `Bearer ${directorLoginResponse.body.data.token}`)
      .send(createClassroom);
    const updateClassroom = await request(app).get("/classroom");
    const response = await request(app)
      .patch(`/classroom/${updateClassroom.body.data[0].id}`)
      .send(updateClassroom);

    expect(response.body.message).toHaveProperty("invalid token");
    expect(response.status).toBe(401);
  });

  test("PATCH /classroom/:id -> should be able to update a classroom", async () => {
    const directorLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);
    const createClassroomResponse = await request(app)
      .post("/classroom")
      .set("Authorization", `Bearer ${directorLoginResponse.body.data.token}`)
      .send(createClassroom);
    const updateClassroom = await request(app).get("/classroom");
    const response = await request(app)
      .patch(`/classroom/${updateClassroom.body.data[0].id}`)
      .set("Authorization", `Bearer ${directorLoginResponse.body.data.token}`)
      .send(updateClassroom);

    expect(response.body.message).toHaveProperty(
      "updated classroom successfully"
    );
    expect(response.status).toBe(200);
  });

  /*--------------TESTES DA ROTA CLASSROOM /delete-----------------*/

  test("DELETE /classroom/:id -> should be able to delete a classroom", async () => {
    const directorLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);
    await request(app)
      .post("/classroom")
      .set("Authorization", `Bearer ${directorLoginResponse.body.data.token}`)
      .send(createClassroom);
    const deleteClassroom = await request(app).get("/classroom");
    const response = await request(app)
      .delete(`/classroom/${deleteClassroom.body.data[0].id}`)
      .set("Authorization", `Bearer ${directorLoginResponse.body.data.token}`);

    expect(response.status).toBe(200);
  });

  test("DELETE /classroom/:id -> should not be able to delete a classroom without permission", async () => {
    const directorLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);
    await request(app)
      .post("/classroom")
      .set("Authorization", `Bearer ${directorLoginResponse.body.data.token}`)
      .send(createClassroom);
    const simplePermissionProfessional = await request(app)
      .post("/login")
      .send(loginProfessionalIsNotAdm);
    const deleteClassroom = await request(app).get("/classroom");
    const response = await request(app)
      .delete(`/classroom/${deleteClassroom.body.data[0].id}`)
      .set(
        "Authorization",
        `Bearer ${simplePermissionProfessional.body.data.token}`
      );

    expect(response.body.message).toHaveProperty(
      "you must be logged as a professional adm"
    );
    expect(response.status).toBe(401);
  });

  test("DELETE /classroom/:id -> should not be able to delete a classroom with a invalid token", async () => {
    const directorLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);
    await request(app)
      .post("/classroom")
      .set("Authorization", `Bearer ${directorLoginResponse.body.data.token}`)
      .send(createClassroom);

    const deleteClassroom = await request(app).get("/classroom");
    const response = await request(app).delete(
      `/classroom/${deleteClassroom.body.data[0].id}`
    );

    expect(response.body.message).toHaveProperty("invalid or missing token");
    expect(response.status).toBe(401);
  });
});
