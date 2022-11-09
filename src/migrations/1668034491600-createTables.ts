import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1668034491600 implements MigrationInterface {
    name = 'createTables1668034491600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "classRoom" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "capacity" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_50d47a94185f910c672898d2f2b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "grades" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "school_subject" character varying NOT NULL, "firstGrade" integer NOT NULL, "secondGrade" integer NOT NULL, "thirdGrade" integer NOT NULL, "fourthGrade" integer NOT NULL, "absences" integer NOT NULL, CONSTRAINT "PK_4740fb6f5df2505a48649f1687b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teachers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(80) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying NOT NULL, "isTeacher" boolean NOT NULL, "isActive" boolean NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "idRegistrationId" uuid, "idAddressId" uuid, CONSTRAINT "PK_a8d4f83be3abe4c687b0a0093c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teachersRoom" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "classSchedule" TIME NOT NULL, "dayTheWeek" date NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "teacherId" uuid, "classRoomId" uuid, CONSTRAINT "REL_95f2f90bbf6bf20be3f001ff2e" UNIQUE ("classRoomId"), CONSTRAINT "PK_336648fd0b460885b31bb7c6705" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "students" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(80) NOT NULL, "age" character varying NOT NULL, "email" character varying(100) NOT NULL, "password" character varying NOT NULL, "contact" character varying NOT NULL, "isTeacher" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "classRoomId" uuid, "addressId" uuid, "registrationId" uuid, CONSTRAINT "REL_85645cf33a75c8e466ebec428c" UNIQUE ("classRoomId"), CONSTRAINT "REL_fe97c5d9abaaf197721ad0fa37" UNIQUE ("addressId"), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "gradesHistory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "schoolGradeId" uuid, "registrationId" uuid, "studentId" uuid, "gradeId" uuid, CONSTRAINT "REL_f6ce609fc1b22bcc781d3bb99d" UNIQUE ("registrationId"), CONSTRAINT "PK_0621ea3f15e5266f467c8537b3e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schoolGrades" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "nameClassId" uuid, "registrationId" uuid, "studentId" uuid, CONSTRAINT "REL_eff5469e836981f6061c15f885" UNIQUE ("registrationId"), CONSTRAINT "PK_b854161d04295cccfc7425620f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "professionals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "permission" boolean NOT NULL, "name" character varying(80) NOT NULL, "contact" character varying(20) NOT NULL, "cpf" character varying(80) NOT NULL, "email" character varying(80) NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "idAddressId" uuid, CONSTRAINT "PK_d7dc8473b49fcd938def2799387" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cep" character varying(8) NOT NULL, "district" character varying NOT NULL, "number" character varying NOT NULL, "state" character varying(2) NOT NULL, "country" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "teachers" ADD CONSTRAINT "FK_0ef5f97b6e4059654fd002ec2f0" FOREIGN KEY ("idRegistrationId") REFERENCES "professionals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teachers" ADD CONSTRAINT "FK_d59fad21ec4612ec98a79e1b925" FOREIGN KEY ("idAddressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teachersRoom" ADD CONSTRAINT "FK_eaee0db4bc7230d5255780e39c3" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teachersRoom" ADD CONSTRAINT "FK_95f2f90bbf6bf20be3f001ff2ec" FOREIGN KEY ("classRoomId") REFERENCES "classRoom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_85645cf33a75c8e466ebec428ce" FOREIGN KEY ("classRoomId") REFERENCES "classRoom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_fe97c5d9abaaf197721ad0fa37a" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_3c18fc139e76692e3202a3dd97a" FOREIGN KEY ("registrationId") REFERENCES "professionals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gradesHistory" ADD CONSTRAINT "FK_e0a156a46290aeb81cd14232014" FOREIGN KEY ("schoolGradeId") REFERENCES "schoolGrades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gradesHistory" ADD CONSTRAINT "FK_f6ce609fc1b22bcc781d3bb99d6" FOREIGN KEY ("registrationId") REFERENCES "professionals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gradesHistory" ADD CONSTRAINT "FK_825201e4a875bdf03d2a6d4572a" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gradesHistory" ADD CONSTRAINT "FK_9c8ea79ef16d33b17c622912f09" FOREIGN KEY ("gradeId") REFERENCES "grades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schoolGrades" ADD CONSTRAINT "FK_4e10120e93f0998e924f90491dd" FOREIGN KEY ("nameClassId") REFERENCES "classRoom"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schoolGrades" ADD CONSTRAINT "FK_eff5469e836981f6061c15f885f" FOREIGN KEY ("registrationId") REFERENCES "professionals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schoolGrades" ADD CONSTRAINT "FK_1dbab777c3eb4eccfe7e7d928d3" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "professionals" ADD CONSTRAINT "FK_e9ee0c7a4fecd3c28f69cd39034" FOREIGN KEY ("idAddressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "professionals" DROP CONSTRAINT "FK_e9ee0c7a4fecd3c28f69cd39034"`);
        await queryRunner.query(`ALTER TABLE "schoolGrades" DROP CONSTRAINT "FK_1dbab777c3eb4eccfe7e7d928d3"`);
        await queryRunner.query(`ALTER TABLE "schoolGrades" DROP CONSTRAINT "FK_eff5469e836981f6061c15f885f"`);
        await queryRunner.query(`ALTER TABLE "schoolGrades" DROP CONSTRAINT "FK_4e10120e93f0998e924f90491dd"`);
        await queryRunner.query(`ALTER TABLE "gradesHistory" DROP CONSTRAINT "FK_9c8ea79ef16d33b17c622912f09"`);
        await queryRunner.query(`ALTER TABLE "gradesHistory" DROP CONSTRAINT "FK_825201e4a875bdf03d2a6d4572a"`);
        await queryRunner.query(`ALTER TABLE "gradesHistory" DROP CONSTRAINT "FK_f6ce609fc1b22bcc781d3bb99d6"`);
        await queryRunner.query(`ALTER TABLE "gradesHistory" DROP CONSTRAINT "FK_e0a156a46290aeb81cd14232014"`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_3c18fc139e76692e3202a3dd97a"`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_fe97c5d9abaaf197721ad0fa37a"`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_85645cf33a75c8e466ebec428ce"`);
        await queryRunner.query(`ALTER TABLE "teachersRoom" DROP CONSTRAINT "FK_95f2f90bbf6bf20be3f001ff2ec"`);
        await queryRunner.query(`ALTER TABLE "teachersRoom" DROP CONSTRAINT "FK_eaee0db4bc7230d5255780e39c3"`);
        await queryRunner.query(`ALTER TABLE "teachers" DROP CONSTRAINT "FK_d59fad21ec4612ec98a79e1b925"`);
        await queryRunner.query(`ALTER TABLE "teachers" DROP CONSTRAINT "FK_0ef5f97b6e4059654fd002ec2f0"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "professionals"`);
        await queryRunner.query(`DROP TABLE "schoolGrades"`);
        await queryRunner.query(`DROP TABLE "gradesHistory"`);
        await queryRunner.query(`DROP TABLE "students"`);
        await queryRunner.query(`DROP TABLE "teachersRoom"`);
        await queryRunner.query(`DROP TABLE "teachers"`);
        await queryRunner.query(`DROP TABLE "grades"`);
        await queryRunner.query(`DROP TABLE "classRoom"`);
    }

}
