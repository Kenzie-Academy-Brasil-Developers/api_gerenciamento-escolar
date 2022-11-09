import request from "supertest";
import app from "../../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import {
  createProfessional,
  updateClassroom,
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
  });

  afterAll(async () => {
    await connection.destroy();
  });
  let idProfessional = "";
  let idProfessor = "";
  let idSchoolGrade = "";

  /*--------------TESTES DA ROTA CLASSROOM /POST--------------*/
  test("POST /classroom -> should be able to create a classroom", async () => {
    const adressResponse = await request(app)
      .post("/address")
      .send(addressProfessional);

    createProfessional.id_address = adressResponse.body.data.id;
    const createDirectorResponse = await request(app)
      .post("/professionals")
      .send(createProfessional);

    idProfessional = createDirectorResponse.body.data.id;

    const directorLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);

    const addressStudentResponse = await request(app)
      .post("/address")
      .send(addressStudent);

    createSchoolGrade.id_registration = createDirectorResponse.body.id;
    const createSchGrade = await request(app)
      .post("/schoolGrade")
      .send(createSchoolGrade)
      .set("Authorization", `Bearer ${directorLoginResponse.body.data}`);
    idSchoolGrade = createSchGrade.body.data.id;
    createClassroom.id_schoolGrade = createSchGrade.body.id;
    const createdClassroomResponse = await request(app)
      .post("/classroom")
      .set("Authorization", `Bearer ${directorLoginResponse.body.data}`)
      .send(createClassroom);

    expect(createdClassroomResponse.status).toBe(201);
    expect(createdClassroomResponse.body.message).toBe(
      "classroom created successfully"
    );
    expect(createdClassroomResponse.body).toHaveProperty("data");
    expect(createdClassroomResponse.body.data).toHaveProperty("name");
    expect(createdClassroomResponse.body.data).toHaveProperty("capacity");
    expect(createdClassroomResponse.body.data).toHaveProperty("id");
    expect(createdClassroomResponse.body.data).toHaveProperty("createdAt");
    expect(createdClassroomResponse.body.data).toHaveProperty("updatedAt");
  });

  test("POST /classroom -> not be able to create a classroom with same same", async () => {
    const adressResponse = await request(app)
      .post("/address")
      .send(addressProfessional);

    createProfessional.id_address = adressResponse.body.id;
    const createDirectorResponse = await request(app)
      .post("/professionals")
      .send(createProfessional);

    const directorLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);

    const addressStudentResponse = await request(app)
      .post("/address")
      .send(addressStudent);

    createSchoolGrade.id_registration = createDirectorResponse.body.id;
    const createSchGrade = await request(app)
      .post("/schoolGrade")
      .send(createSchoolGrade)
      .set("Authorization", `Bearer ${directorLoginResponse.body.data}`);

    createClassroom.id_schoolGrade = createSchGrade.body.id;
    const createdClassroomResponse = await request(app)
      .post("/classroom")
      .set("Authorization", `Bearer ${directorLoginResponse.body.data}`)
      .send(createClassroom);

    createStudent.id_address = addressStudentResponse.body.id;
    createStudent.id_schoolGrade = createSchGrade.body.id;
    createStudent.id_classroom = createdClassroomResponse.body.id;
    createStudent.id_registration = createDirectorResponse.body.id;

    const creatStudent = await request(app)
      .post("/professionals")
      .send(createStudent)
      .set("Authorization", `Bearer ${directorLoginResponse.body.data}`);

    expect(createdClassroomResponse.body.message).toBe(
      "Classroom already exists"
    );
    expect(createdClassroomResponse.status).toBe(400);
  });

  /*--------------*TESTES DA ROTA CLASSROOM /GET*--------------*/

  test("GET /classroom - should be list all classrooms", async () => {
    const response = await request(app).get("/classroom");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.message).toBe("search performed successfully");
  });

  test("GET /classroom/:id_teacher/teacher - should be search teacher's classroom", async () => {
    const adressProfessor = await request(app)
      .post("/address")
      .send(addressTeacher);

    const loginDirector = await request(app)
      .post("/login")
      .send(loginProfessional);

    createTeacher.id_address = adressProfessor.body.data.id;
    createTeacher.id_registration = idProfessional;
    const createProfessorResponse = await request(app)
      .post("/teacher")
      .send(createTeacher)
      .set("Authorization", `Bearer ${loginDirector.body.data}`);
    const idProfessor = createProfessorResponse.body.data.id;
    const loginResponse = await request(app).post("/login").send(loginTeacher);

    const response = await request(app)
      .get(`/classroom/${createProfessorResponse.body.data.id}/teacher`)
      .set("Authorization", `Bearer ${loginDirector.body.data}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("search performed successfully");
    expect(response.body).toHaveProperty("data");
  });

  test("GET /classroom/:id_teacher/teacher - should not be able to search teacher's classroom with invalid token", async () => {
    const adressResponse = await request(app)
      .post("/address")
      .send(addressProfessional);
    createProfessional.id_address = adressResponse.body.id;
    const adressProfessor = await request(app)
      .post("/address")
      .send(addressTeacher);

    const createDirectorResponse = await request(app)
      .post("/professionals")
      .send(createProfessional);
    const loginDirector = await request(app)
      .post("/login")
      .send(loginProfessional);
    createTeacher.id_address = adressProfessor.body.id;
    createTeacher.id_registration = createDirectorResponse.body.id;
    const createProfessorResponse = await request(app)
      .post("/professionals")
      .send(createTeacher);

    const loginResponse = await request(app).post("/login").send(loginTeacher);

    const response = await request(app)
      .get(`/classroom/${createProfessorResponse.body.id}/teacher`)
      .set("Authorization", `Bearer ${"tokenAleatorio"}`);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid token");
  });

  /**--------------TESTES DA ROTA CLASSROOM /update*--------------*/

  test("PATCH /classroom/:id -> should not be able to update a classroom without permission", async () => {
    const loginProfessor = await request(app).post("/login").send(loginTeacher);

    const updatedClassroom = await request(app).get("/classroom");

    const response = await request(app)
      .patch(`/classroom/${updatedClassroom.body.data[0].id}`)
      .set("Authorization", `Bearer ${loginProfessor.body.data}`)
      .send(updateClassroom);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("permission denied, not adm");
  });

  test("PATCH /classroom/:id -> should not be able to update a classroom with invalid token", async () => {
    const updatedClassroom = await request(app).get("/classroom");

    const response = await request(app)
      .patch(`/classroom/${updatedClassroom.body.data[0].id}`)
      .set("Authorization", `Bearer token`)
      .send(updateClassroom);

    expect(response.body.message).toBe("Invalid token");
    expect(response.status).toBe(401);
  });

  test("PATCH /classroom/:id -> should be able to update a classroom", async () => {
    const loginDirector = await request(app)
      .post("/login")
      .send(loginProfessional);

    const updatedClassroom = await request(app).get("/classroom");

    const response = await request(app)
      .patch(`/classroom/${updatedClassroom.body.data[0].id}`)
      .set("Authorization", `Bearer ${loginDirector.body.data}`)
      .send(updateClassroom);

    expect(response.body.message).toBe("updated classroom successfully");
    expect(response.body.data.name).toBe(`${updateClassroom.name}`);
    expect(response.body.data.capacity).toBe(
      parseInt(`${updateClassroom.capacity}`)
    );
    expect(response.status).toBe(200);
  });

  /*--------------TESTES DA ROTA CLASSROOM /delete-----------------*/

  test("/DELETE /classroom/:id -> should be able to delete a classroom", async () => {
    const directorLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);

    const deleteClassroom = await request(app).get("/classroom");
    console.log(deleteClassroom.body, directorLoginResponse.body, "test2");
    const response = await request(app)
      .delete(`/classroom/${deleteClassroom.body.data[0].id}`)
      .set("Authorization", `Bearer ${directorLoginResponse.body.data}`);

    expect(response.status).toBe(204);
  });

  test("DELETE /classroom/:id -> should not be able to delete a classroom without permission", async () => {
    const directorLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);
    await request(app)
      .post("/classroom")
      .set("Authorization", `Bearer ${directorLoginResponse.body.data}`)
      .send(createClassroom);

    const simplePermissionProfessional = await request(app)
      .post("/login")
      .send(loginProfessionalIsNotAdm);

    const deleteClassroom = await request(app).get("/classroom");

    const response = await request(app)
      .delete(`/classroom/${deleteClassroom.body.data[0].id}`)
      .set("Authorization", `Bearer ${simplePermissionProfessional.body.data}`);

    expect(response.body.message).toBe("Invalid token");
    expect(response.status).toBe(401);
  });

  test("DELETE /classroom/:id -> should not be able to delete a classroom with a invalid token", async () => {
    const directorLoginResponse = await request(app)
      .post("/login")
      .send(loginProfessional);
    createClassroom.id_schoolGrade = directorLoginResponse.body.id;
    await request(app)
      .post("/classroom")
      .set("Authorization", `Bearer ${directorLoginResponse.body.data}`)
      .send(createClassroom);

    const deleteClassroom = await request(app).get("/classroom");
    const response = await request(app).delete(
      `/classroom/${deleteClassroom.body.data[0].id}`
    );

    expect(response.body.message).toBe("Invalid token");
    expect(response.status).toBe(401);
  });
});
