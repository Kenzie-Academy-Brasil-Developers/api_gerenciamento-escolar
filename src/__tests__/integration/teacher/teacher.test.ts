import AppDataSource from "../../../data-source";
import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../../app";
import { mockedAddressId } from "../addresses/addresses.test";
import {
  createTeacher,
  loginProfessional,
  loginProfessionalIsNotAdm,
} from "../../mocks";

describe("/teacher", () => {
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

  const mockedTeacher3 = {
    name: "Professor 3",
    email: "professor3@gmail.com",
    password: "12345678",
    id_address: mockedAddressId,
    id_registration: "",
  };

  test("POST /teacher - Must be able to register a teacher", async () => {
    const response = await request(app).post("/teacher").send(createTeacher);

    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("name");
    expect(response.body.data).toHaveProperty("email");
    expect(response.body.data).toHaveProperty("isTeacher");
    expect(response.body.data).toHaveProperty("id_address");
    expect(response.body.data).toHaveProperty("id_registration");
    expect(response.body.data).toHaveProperty("createdAt");
    expect(response.body.data).toHaveProperty("updatedAt");
    expect(response.body.data).toHaveProperty("isActive");
    expect(response.body.data).not.toHaveProperty("password");

    expect(response.body.data.name).toEqual("Professor 1");
    expect(response.body.data.email).toEqual("professor1@gmail.com");
    expect(response.body.data.isTeacher).toEqual(true);
    expect(response.body.data.isActive).toEqual(true);
    expect(response.status).toBe(201);
  });

  test("POST /teacher - Should not be able to register a teacher that already exists", async () => {
    const response = await request(app).post("/teacher").send(createTeacher);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /teacher - Should not be able to register teacher without token or with permission not being admin", async () => {
    const teacherLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessionalIsNotAdm);
    const response = await request(app)
      .post("/teacher")
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /teacher - Must be able to fetch every teacher", async () => {
    await request(app).post("/teacher").send(mockedTeacher3);
    const loginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);
    const response = await request(app)
      .get("/teacher")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveLength(2);
  });

  test("GET /teacher - It should not be possible to search for teachers without a token or with permission not being an administrator", async () => {
    const teacherLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessionalIsNotAdm);
    const response = await request(app)
      .get("/teacher")
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /teacher/:id - Trying to update the fields, id, isActive, isTeacher, id_registration", async () => {
    const newValues = { id: false };

    const teacherLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);
    const token = `Bearer ${teacherLoginResponse.body.token}`;

    const teacherTobeUpdateRequest = await request(app)
      .get("/teacher")
      .set("Authorization", token);
    const teacherTobeUpdateId = teacherTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/teacher/${teacherTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("PATCH /teacher/:id - Trying to update the fields, id, isActive, isTeacher, id_registration", async () => {
    const newValues = { isActive: false };

    const teacherLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);
    const token = `Bearer ${teacherLoginResponse.body.token}`;

    const teacherTobeUpdateRequest = await request(app)
      .get("/teacher")
      .set("Authorization", token);
    const teacherTobeUpdateId = teacherTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/teacher/${teacherTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("PATCH /teacher/:id - Trying to update the fields, id, isActive, isTeacher, id_registration", async () => {
    const newValues = { isTeacher: false };

    const teacherLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);
    const token = `Bearer ${teacherLoginResponse.body.token}`;

    const teacherTobeUpdateRequest = await request(app)
      .get("/teacher")
      .set("Authorization", token);
    const teacherTobeUpdateId = teacherTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/teacher/${teacherTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("PATCH /teacher/:id - Trying to update the fields, id, isActive, isTeacher, id_registration", async () => {
    const newValues = { id_registration: false };

    const teacherLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);
    const token = `Bearer ${teacherLoginResponse.body.token}`;

    const teacherTobeUpdateRequest = await request(app)
      .get("/teacher")
      .set("Authorization", token);
    const teacherTobeUpdateId = teacherTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/teacher/${teacherTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("PATCH /teacher/:id - Should not be able to do teacher update with another teacher's token", async () => {
    const newValues = { name: "Joana Brito", email: "joanabrito@mail.com" };

    const teacherPermissionLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessionalIsNotAdm);
    await request(app).post("/login").send(loginProfessional);

    const token = `Bearer ${teacherPermissionLoginResponse.body.token}`;

    const teacherTobeUpdateRequest = await request(app)
      .get("/teacher")
      .set("Authorization", token);
    const teacherTobeUpdateId = teacherTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/teacher/${teacherTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /teacher/:id - Should not be able to do Teacher Update without token or with invalid token ", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);
    const teacherTobeUpdate = await request(app)
      .get("/teacher")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    const response = await request(app).patch(
      `/teacher/${teacherTobeUpdate.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /teacher/:id - Should be able to update teacher", async () => {
    const newValues = { name: "Joana Brito", email: "joanabrito@mail.com" };

    const admingLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);
    const token = `Bearer ${admingLoginResponse.body.token}`;

    const teacherTobeUpdateRequest = await request(app)
      .get("/teacher")
      .set("Authorization", token);
    const teacherTobeUpdateId = teacherTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/teacher/${teacherTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues);

    const teacherUpdated = await request(app)
      .get("/teacher")
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(teacherUpdated.body[0].name).toEqual("Joana Brito");
    expect(teacherUpdated.body[0]).not.toHaveProperty("password");
  });

  test("DELETE /teacher/:id - Must be able to do teacher deletion", async () => {
    const permissionLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);
    const teacherTobeDeleted = await request(app)
      .get("/teacher")
      .set("Authorization", `Bearer ${permissionLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/teacher/${teacherTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${permissionLoginResponse.body.token}`);
    const findteacher = await request(app)
      .get("/teacher")
      .set("Authorization", `Bearer ${permissionLoginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(findteacher.body[0].isActive).toBe(false);
  });

  test("DELETE /teacher/:id - Should not be able to delete teacher without being admin", async () => {
    const teacherLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessionalIsNotAdm);
    const teacherTobeUpdateId = teacherLoginResponse.body[0].id;

    const response = await request(app)
      .delete(`/teacher/${teacherTobeUpdateId}`)
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /teacher/:id - Should not be able to delete teacher without token or with invalid token", async () => {
    const permissionLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);
    const teacherTobeUpdate = await request(app)
      .get("/teacher")
      .set("Authorization", `Bearer ${permissionLoginResponse.body.token}`);
    const response = await request(app).delete(
      `/teacher/${teacherTobeUpdate.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});
