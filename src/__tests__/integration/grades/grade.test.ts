import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { createSchoolMaterials, loginStudent, loginTeacher } from "../../mocks";

describe("/schoolMaterials", () => {
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

  test("POST /grade -  Must be able to create a schoolMaterials", async () => {
    
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(loginTeacher);

    const response = await request(app)
      .post("/gradeHistory")
      .set("Authorization", `Bearer ${adminLoginResponse.body.data}`)
      .send({...createSchoolMaterials});
  
    expect(response.body.data).toHaveProperty("school_subject");
    expect(response.body.data).toHaveProperty("firstGrade");
    expect(response.body.data).toHaveProperty("secondGrade");
    expect(response.body.data).toHaveProperty("thirdGrade");
    expect(response.body.data).toHaveProperty("fourthGrade");
    expect(response.body.data).toHaveProperty("absences");

    expect(response.body.data.school_subject).toEqual("Geografia");
    expect(response.body.data.firstGrade).toEqual(10);
    expect(response.body.data.secondGrade).toEqual(5);
    expect(response.body.data.thirdGrade).toEqual(5);
    expect(response.body.data.fourthGrade).toEqual(10);
    expect(response.body.data.absences).toEqual(10);
    expect(response.status).toBe(201);
    
  });

  test("POST /grade -  Must not be able to create a schoolMaterials", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(loginTeacher);
    const response = await request(app)
      .post("/grade")
      .set("Authorization", `Bearer ${adminLoginResponse.body.data}`)
      .send(createSchoolMaterials);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /grade -  should not be able to create a schoolMaterials not being permission", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(loginTeacher);
    const response = await request(app)
      .post("/grade")
      .set("Authorization", `Bearer ${adminLoginResponse.body.data}`)
      .send(createSchoolMaterials);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /grade -  should not be able to create schoolMaterials without authentication", async () => {
    const response = await request(app)
      .post("/grade")
      .send(createSchoolMaterials);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /gradeHistory/student -  Must be able to list all schoolMaterials", async () => {
    const response = await request(app).get("/gradeHistory/student");
    //expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("PATCH /gradeHistory/student/:id -  should be able to update schoolMaterials", async () => {
    const newValues = { fourthGrade: 24, absences: 8 };

    const admingLoginResponse = await request(app)
      .post("/login")
      .send(loginTeacher);
    const token = `Bearer ${admingLoginResponse.body.data}`;

    const schoolMaterialsTobeUpdateRequest = await request(app)
      .get("/teacher")
      .set("Authorization", token);
    const schoolMaterialsTobeUpdateId =
      schoolMaterialsTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/gradeHistory/student/${schoolMaterialsTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues);

    const userUpdated = await request(app)
      .get("/gradeHistory/student")
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(userUpdated.body[0].absences).toEqual(8);
    expect(userUpdated.body[0].fourthGrade).toEqual(24);
    expect(userUpdated.body[0]).not.toHaveProperty("password");
  });

  test("PATCH /gradeHistory/student/:id - should not be able to update another user without permission", async () => {
    const LoginResponse = await request(app).post("/login").send(loginStudent);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(loginTeacher);
    const UserTobeDeleted = await request(app)
      .get("/teacher")
      .set("Authorization", `Bearer ${adminLoginResponse.body.data}`);

    const response = await request(app)
      .delete(`/teacher/${UserTobeDeleted.body.data}`)
      .set("Authorization", `Bearer ${LoginResponse.body.data}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /gradeHistory/student/:id -  should not be able to delete schoolMaterials without authentication", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(loginTeacher);
    const materialsDeleted = await request(app)
      .get("/gradeHistory/student")
      .set("Authorization", `Bearer ${adminLoginResponse.body.data}`);

    const response = await request(app).delete(
      `/teacher/${materialsDeleted.body.id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /gradeHistory/student/:id -  should not be able to delete schoolMaterials not being permission", async () => {
    const LoginResponse = await request(app).post("/login").send(loginStudent);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(loginTeacher);
    const UserTobeDeleted = await request(app)
      .get("/teacher")
      .set("Authorization", `Bearer ${adminLoginResponse.body.data}`);

    const response = await request(app)
      .delete(`/teacher/${UserTobeDeleted.body.data}`)
      .set("Authorization", `Bearer ${LoginResponse.body.data}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /gradeHistory/student/:id -  should not be able to delete schoolMaterials with invalid id", async () => {
    await request(app).post("/teacher").send(loginTeacher);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(loginTeacher);

    const response = await request(app)
      .delete(`/teacher/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.data}`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /gradeHistory/student/:id -  Must be able to delete schoolMaterials", async () => {
    await request(app).post("/teacher").send(loginTeacher);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(loginTeacher);

    const schoolMaterialTobeDeleted = await request(app)
      .get("/teacher")
      .set("Authorization", `Bearer ${adminLoginResponse.body.data}`);

    const response = await request(app)
      .delete(`/gradeHistory/student/${schoolMaterialTobeDeleted.body.id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.data}`);

    expect(response.status).toBe(204);
  });
});
