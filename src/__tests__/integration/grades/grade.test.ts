import { DataSource } from "typeorm";
import AppDataSource from "../../../data-souce";
import request from "supertest"
import app from "../../../app";
import {createSchoolMaterials,loginStudent, loginTeacher} from "../../mocks"


describe("/schoolMaterials", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
        
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /schoolMaterials -  Must be able to create a schoolMaterials",async () => {
      const adminLoginResponse = await request(app).post("/login").send(loginTeacher);      
      const response = await request(app).post("/schoolMaterials").set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(createSchoolMaterials)
      
        
        expect(response.body).toHaveProperty("school_subject")
        expect(response.body).toHaveProperty("firstGrade")
        expect(response.body).toHaveProperty("secondGrade")
        expect(response.body).toHaveProperty("thirdGrade")
        expect(response.body).toHaveProperty("fourthGrade")
        expect(response.body).toHaveProperty("absences")
        expect(response.status).toBe(201)
     
    });

  test("POST /schoolMaterials -  Must not be able to create a schoolMaterials",async () => {
      const adminLoginResponse = await request(app).post("/login").send(loginTeacher);      
      const response = await request(app).post("/schoolMaterials").set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(createSchoolMaterials)
              
      expect(response.body).toHaveProperty("message")
      expect(response.status).toBe(400)
     
  });

  test("POST /schoolMaterials -  should not be able to create a schoolMaterials not being permission",async () => {
    const adminLoginResponse = await request(app).post("/login").send(loginTeacher);      
    const response = await request(app).post("/schoolMaterials").set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(createSchoolMaterials)

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(403)
 
  });

  test("POST /schoolMaterials -  should not be able to create schoolMaterials without authentication",async () => {
    const response = await request(app).post("/schoolMaterials").send(createSchoolMaterials)

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)
 
  });

  test("GET /schoolMaterials -  Must be able to list all schoolMaterials",async () => {
    const response = await request(app).get('/schoolMaterials')
    expect(response.body).toHaveLength(1)
    expect(response.status).toBe(200)
 
  });

  test("PATCH /schoolMaterials -  should be able to update schoolMaterials",async () => {
    const newValues = { fourthGrade: 24, absences: 8,}

    const admingLoginResponse = await request(app).post("/login").send(loginTeacher);
    const token = `Bearer ${admingLoginResponse.body.token}`
    
    const schoolMaterialsTobeUpdateRequest = await request(app).get("/teacher").set("Authorization", token)
    const schoolMaterialsTobeUpdateId = schoolMaterialsTobeUpdateRequest.body[0].id

    const response = await request(app).patch(`/schoolMaterials/${schoolMaterialsTobeUpdateId}`).set("Authorization",token).send(newValues)

    const userUpdated = await request(app).get("/schoolMaterials").set("Authorization", token)

    expect(response.status).toBe(200)
    expect(userUpdated.body[0].name).toEqual(24)
    expect(userUpdated.body[0]).not.toHaveProperty("password")
  });

  test("PATCH /schoolMaterials/:id - should not be able to update another user without permission",async () => {
    const newValues = {isActive: false}

    const schoolMaterialsLoginResponse = await request(app).post("/login").send(loginTeacher);
    const admingLoginResponse = await request(app).post("/login").send(loginTeacher);
    const userToken = `Bearer ${schoolMaterialsLoginResponse.body.token}`
    const adminToken = `Bearer ${admingLoginResponse.body.token}`
    
    const schoolMaterialsTobeUpdateRequest = await request(app).get("/users").set("Authorization", adminToken)
    const schoolMaterialsTobeUpdateId = schoolMaterialsTobeUpdateRequest.body[1].id

    const response = await request(app).patch(`/users/${schoolMaterialsTobeUpdateId}`).set("Authorization",userToken).send(newValues)

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)
  });

  test("DELETE /schoolMaterials/:id -  should not be able to delete schoolMaterials without authentication",async () => {
    const adminLoginResponse = await request(app).post("/login").send(loginTeacher);      
    const materialsDeleted = await request(app).get('/schoolMaterials').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

    const response = await request(app).delete(`/users/${materialsDeleted.body[0].id}`)

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(401)
         
  });

  test("DELETE /schoolMaterials/:id -  should not be able to delete schoolMaterials not being permission",async () => {
    const LoginResponse = await request(app).post("/login").send(loginStudent);
    const adminLoginResponse = await request(app).post("/login").send(loginTeacher);
    const UserTobeDeleted = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

    const response = await request(app).delete(`/users/${UserTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${LoginResponse.body.token}`)

    expect(response.body).toHaveProperty("message")
    expect(response.status).toBe(403)
         
  });

  test("DELETE -  should not be able to delete schoolMaterials with invalid id",async () => {
    await request(app).post('/teacher').send(loginTeacher)

    const adminLoginResponse = await request(app).post("/login").send(loginTeacher);
    
    const response = await request(app).delete(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty("message")
 
  });

  test("DELETE /schoolMaterials/:id -  Must be able to delete schoolMaterials",async () => {
    await request(app).post('/users').send(loginTeacher)

    const adminLoginResponse = await request(app).post("/login").send(loginTeacher);
    const schoolMaterialTobeDeleted = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

    const response = await request(app).delete(`/schoolMaterials/${schoolMaterialTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
    
    expect(response.status).toBe(204)
 
  });

});

