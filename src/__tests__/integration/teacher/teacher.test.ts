import AppDataSource from "../../../data-source";
import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../../app";
import { mockedAddressId } from "../addresses/addresses.test";
import {
  addressProfessional,
  createProfessional,
  createProfessionalIsNotAdm,
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
    isTeacher: true,
    id_address: "",
    id_registration: "",
  };

  const loginMockedTeacher3 = {
    email: "professor3@gmail.com",
    password: "12345678",
  };

  test("POST /teacher - Must be able to register a teacher", async () => {
    const responseAddress = await request(app)
      .post("/address")
      .send(addressProfessional);

    const responseProfessionals = await request(app)
      .post("/professionals")
      .send({
        ...createProfessional,
        id_address: responseAddress.body.data.id,
      });

    const professionalLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);

    const response = await request(app)
      .post("/teacher")
      .set("Authorization", `Bearer ${professionalLoginResponse.body.data}`)
      .send({
        ...createTeacher,
        id_address: responseAddress.body.data.id,
        id_registration: responseProfessionals.body.data.id,
      });

    mockedTeacher3.id_address = responseAddress.body.data.id;
    mockedTeacher3.id_registration = responseProfessionals.body.data.id;

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
    const professionalLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);

    const response = await request(app)
      .post("/teacher")
      .set("Authorization", `Bearer ${professionalLoginResponse.body.data}`)
      .send(createTeacher);

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
    const professionalLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);

    const response = await request(app)
      .get("/teacher")
      .set("Authorization", `Bearer ${professionalLoginResponse.body.data}`);

    expect(response.body.data).toHaveLength(1);
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
    const token = `Bearer ${teacherLoginResponse.body.data}`;

    const teacherTobeUpdateRequest = await request(app)
      .get("/teacher")
      .set("Authorization", token);

    const teacherTobeUpdateId = teacherTobeUpdateRequest.body.data[0].id;

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
    const token = `Bearer ${teacherLoginResponse.body.data}`;

    const teacherTobeUpdateRequest = await request(app)
      .get("/teacher")
      .set("Authorization", token);

    const teacherTobeUpdateId = teacherTobeUpdateRequest.body.data[0].id;

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
    const token = `Bearer ${teacherLoginResponse.body.data}`;

    const teacherTobeUpdateRequest = await request(app)
      .get("/teacher")
      .set("Authorization", token);
    const teacherTobeUpdateId = teacherTobeUpdateRequest.body.data[0].id;

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
    const token = `Bearer ${teacherLoginResponse.body.data}`;

    const teacherTobeUpdateRequest = await request(app)
      .get("/teacher")
      .set("Authorization", token);
    const teacherTobeUpdateId = teacherTobeUpdateRequest.body.data[0].id;

    const response = await request(app)
      .patch(`/teacher/${teacherTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("PATCH /teacher/:id - Should not be able to do Teacher Update without token or with invalid token ", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);

    const teacherTobeUpdate = await request(app)
      .get("/teacher")
      .set("Authorization", `Bearer ${adminLoginResponse.body.data}`);

    const response = await request(app).patch(
      `/teacher/${teacherTobeUpdate.body.data[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /teacher/:id - Should be able to update teacher", async () => {
    const newValues = { name: "Joana Brito", email: "joanabrito@mail.com" };

    const admingLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);
    const token = `Bearer ${admingLoginResponse.body.data}`;

    const teacherTobeUpdateRequest = await request(app)
      .get("/teacher")
      .set("Authorization", token);
    const teacherTobeUpdateId = teacherTobeUpdateRequest.body.data[0].id;

    const response = await request(app)
      .patch(`/teacher/${teacherTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues);

    const teacherUpdated = await request(app)
      .get("/teacher")
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(teacherUpdated.body.data[0].name).toEqual("Joana Brito");
    expect(teacherUpdated.body.data[0]).not.toHaveProperty("password");
  });

  test("DELETE /teacher/:id - Must be able to do teacher deletion", async () => {
    const permissionLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);

    const teacherTobeDeleted = await request(app)
      .get("/teacher")
      .set("Authorization", `Bearer ${permissionLoginResponse.body.data}`);

    const response = await request(app)
      .delete(`/teacher/${teacherTobeDeleted.body.data[0].id}`)
      .set("Authorization", `Bearer ${permissionLoginResponse.body.data}`);

    const findteacher = await request(app)
      .get("/teacher")
      .set("Authorization", `Bearer ${permissionLoginResponse.body.data}`);

    expect(response.status).toBe(200);
    expect(findteacher.body.data[0].isActive).toBe(false);
  });

  test("DELETE /teacher/:id - Should not be able to delete teacher without being admin", async () => {
    const address2 = {
      district: "Rua Waldemar Francisco do Nascimento",
      cep: "59142740",
      number: "533",
      country: "Brasil",
      state: "RN",
    };

    const responseAddress = await request(app).post("/address").send(address2);

    await request(app)
      .post("/professionals")
      .send({
        ...createProfessionalIsNotAdm,
        id_address: responseAddress.body.data.id,
      });

    const professionalLoginResponseNotAdm = await request(app)
      .post("/login")
      .send(loginProfessionalIsNotAdm);

    const teacherTobeUpdate = await request(app)
      .get("/teacher")
      .set(
        "Authorization",
        `Bearer ${professionalLoginResponseNotAdm.body.data}`
      );

    const teacherTobeUpdateId = teacherTobeUpdate.body.data[0].id;

    const response = await request(app)
      .delete(`/teacher/${teacherTobeUpdateId}`)
      .set(
        "Authorization",
        `Bearer ${professionalLoginResponseNotAdm.body.data}`
      );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /teacher/:id - Should not be able to delete teacher without token or with invalid token", async () => {
    const permissionLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);
    const teacherTobeUpdate = await request(app)
      .get("/teacher")
      .set("Authorization", `Bearer ${permissionLoginResponse.body.data}`);

    const response = await request(app).delete(
      `/teacher/${teacherTobeUpdate.body.data[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});
