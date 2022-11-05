import request from "supertest";
import app from "../../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import {
  createProfessional,
  createProfessionalIsNotAdm,
  loginProfessional,
  createClassroom,
  createTeacher,
  loginTeacher,
  loginProfessionalIsNotAdm,
  createStudent,
  createSchoolGrade,
  addressProfessional,
  addressStudent,
  addressTeacher,
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
    const adressResponse = await request(app)
      .post("/address")
      .send(addressProfessional);

    const createDirectorResponse = await request(app)
      .post("/professionals")
      .send(createProfessional);
    createProfessional.id_address = adressResponse.body.data.id;

    const directorLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);

    const addressStudentResponse = await request(app)
      .post("/address")
      .send(addressStudent);

    const createSchGrade = await request(app)
      .post("/schoolGrade/student")
      .send(createSchoolGrade)
      .set("Authorization", `Bearer ${directorLoginResponse.body.data.token}`);
    createSchoolGrade.id_registration = createDirectorResponse.body.data.id;

    const createdClassroomResponse = await request(app)
      .post("/classroom")
      .set("Authorization", `Bearer ${directorLoginResponse.body.data.token}`)
      .send(createClassroom);

    const creatStudent = await request(app)
      .post("/professionals")
      .send(createStudent)
      .set("Authorization", `Bearer ${directorLoginResponse.body.data.token}`);
    createStudent.id_address = addressStudentResponse.body.data.id;
    createStudent.id_schoolGrade = createSchGrade.body.data.id;
    createStudent.id_classroom = createdClassroomResponse.body.data.id;
    createStudent.id_registration = createDirectorResponse.body.data.id;

    expect(createdClassroomResponse.status).toBe(201);
    expect(createdClassroomResponse.body.message).toHaveProperty(
      "classroom created successfully"
    );
    expect(createdClassroomResponse.body).toHaveProperty("data");
    expect(createdClassroomResponse.body.data).toHaveProperty("name");
    expect(createdClassroomResponse.body.data).toHaveProperty("capacity");
    expect(createdClassroomResponse.body.data).toHaveProperty("id_schoolGrade");
    expect(createdClassroomResponse.body.data).toHaveProperty("id");
    expect(createdClassroomResponse.body.data).toHaveProperty("createdAt");
    expect(createdClassroomResponse.body.data).toHaveProperty("updatedAt");
  });

  test("POST /classroom -> not be able to create a classroom without permission", async () => {
    const response = await request(app)
      .post("/classroom")
      .send(createClassroom);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("POST /classroom -> not be able to create a classroom with the same name", async () => {
    const adressResponse = await request(app)
      .post("/address")
      .send(addressProfessional);

    const createDirectorResponse = await request(app)
      .post("/professionals")
      .send(createProfessional);
    createProfessional.id_address = adressResponse.body.data.id;

    const directorLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);

    const addressStudentResponse = await request(app)
      .post("/address")
      .send(addressStudent);

    const createSchGrade = await request(app)
      .post("/schoolGrade/student")
      .send(createSchoolGrade)
      .set("Authorization", `Bearer ${directorLoginResponse.body.data.token}`);
    createSchoolGrade.id_registration = createDirectorResponse.body.data.id;

    const createdClassroomResponse = await request(app)
      .post("/classroom")
      .set("Authorization", `Bearer ${directorLoginResponse.body.data.token}`)
      .send(createClassroom);

    const creatStudent = await request(app)
      .post("/professionals")
      .send(createStudent)
      .set("Authorization", `Bearer ${directorLoginResponse.body.data.token}`);
    createStudent.id_address = addressStudentResponse.body.data.id;
    createStudent.id_schoolGrade = createSchGrade.body.data.id;
    createStudent.id_classroom = createdClassroomResponse.body.data.id;
    createStudent.id_registration = createDirectorResponse.body.data.id;

    expect(createdClassroomResponse.body.message).toHaveProperty(
      "there is already a room with the same name"
    );
    expect(createdClassroomResponse.status).toBe(400);
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

  test("GET /classroom/:id_teacher/teacher - should be search teacher's classroom", async () => {
    const adressResponse = await request(app)
      .post("/address")
      .send(addressProfessional);

    const adressProfessor = await request(app)
      .post("/address")
      .send(addressTeacher);

    const createDirectorResponse = await request(app)
      .post("/professionals")
      .send(createProfessional);
    createProfessional.id_address = adressResponse.body.data.id;

    const createProfessorResponse = await request(app)
      .post("/professionals")
      .send(createTeacher);

    createTeacher.id_address = adressProfessor.body.data.id;
    createTeacher.id_registration = createDirectorResponse.body.data.id;

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

    const classroomCreated = await request(app)
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
    const adressResponse = await request(app)
      .post("/address")
      .send(addressProfessional);

    const createDirectorResponse = await request(app)
      .post("/professionals")
      .send(createProfessional);
    createProfessional.id_address = adressResponse.body.data.id;

    const createSchGrade = await request(app)
      .post("/schoolGrade/student")
      .send(createSchoolGrade)
      .set("Authorization", `Bearer ${createDirectorResponse.body.data.token}`);
    createSchoolGrade.id_registration = createDirectorResponse.body.data.id;

    const createdClassroomResponse = await request(app)
      .post("/classroom")
      .set("Authorization", `Bearer ${createDirectorResponse.body.data.token}`)
      .send(createClassroom);

    const updateClassroom = await request(app).get("/classroom");

    const response = await request(app)
      .patch(`/classroom/${updateClassroom.body.data[0].id}`)
      .set("Authorization", `Bearer ${createDirectorResponse.body.data.token}`)
      .send(updateClassroom);

    expect(response.body.message).toHaveProperty(
      "updated classroom successfully"
    );
    expect(response.status).toBe(200);
  });

  /*--------------TESTES DA ROTA CLASSROOM /delete-----------------*/

  test("DELETE /classroom/:id -> should be able to delete a classroom", async () => {
    const adressResponse = await request(app)
      .post("/address")
      .send(addressProfessional);

    const createDirectorResponse = await request(app)
      .post("/professionals")
      .send(createProfessional);
    createProfessional.id_address = adressResponse.body.data.id;

    const createSchGrade = await request(app)
      .post("/schoolGrade/student")
      .send(createSchoolGrade)
      .set("Authorization", `Bearer ${createDirectorResponse.body.data.token}`);
    createSchoolGrade.id_registration = createDirectorResponse.body.data.id;

    const createdClassroomResponse = await request(app)
      .post("/classroom")
      .set("Authorization", `Bearer ${createDirectorResponse.body.data.token}`)
      .send(createClassroom);

    const deleteClassroom = await request(app).get("/classroom");
    const response = await request(app)
      .delete(`/classroom/${deleteClassroom.body.data[0].id}`)
      .set("Authorization", `Bearer ${createDirectorResponse.body.data.token}`);

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
