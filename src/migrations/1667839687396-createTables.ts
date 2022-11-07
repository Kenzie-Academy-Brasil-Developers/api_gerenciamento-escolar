import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1667839687396 implements MigrationInterface {
    name = 'createTables1667839687396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teachersRoom" DROP CONSTRAINT "FK_3313fb530d092389bcd25c3e484"`);
        await queryRunner.query(`ALTER TABLE "teachersRoom" RENAME COLUMN "eacherId" TO "teacherId"`);
        await queryRunner.query(`CREATE TABLE "grades" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "school_subject" character varying NOT NULL, "firstGrade" integer NOT NULL, "secondGrade" integer NOT NULL, "thirdGrade" integer NOT NULL, "fourthGrade" integer NOT NULL, "absences" integer NOT NULL, CONSTRAINT "PK_4740fb6f5df2505a48649f1687b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "gradesHistory" ADD "gradeId" uuid`);
        await queryRunner.query(`ALTER TABLE "teachersRoom" ADD CONSTRAINT "FK_eaee0db4bc7230d5255780e39c3" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gradesHistory" ADD CONSTRAINT "FK_9c8ea79ef16d33b17c622912f09" FOREIGN KEY ("gradeId") REFERENCES "grades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gradesHistory" DROP CONSTRAINT "FK_9c8ea79ef16d33b17c622912f09"`);
        await queryRunner.query(`ALTER TABLE "teachersRoom" DROP CONSTRAINT "FK_eaee0db4bc7230d5255780e39c3"`);
        await queryRunner.query(`ALTER TABLE "gradesHistory" DROP COLUMN "gradeId"`);
        await queryRunner.query(`DROP TABLE "grades"`);
        await queryRunner.query(`ALTER TABLE "teachersRoom" RENAME COLUMN "teacherId" TO "eacherId"`);
        await queryRunner.query(`ALTER TABLE "teachersRoom" ADD CONSTRAINT "FK_3313fb530d092389bcd25c3e484" FOREIGN KEY ("eacherId") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
