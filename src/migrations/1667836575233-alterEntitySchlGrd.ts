import { MigrationInterface, QueryRunner } from "typeorm";

export class alterEntitySchlGrd1667836575233 implements MigrationInterface {
    name = 'alterEntitySchlGrd1667836575233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gradesHistory" ADD "schoolGradeId" uuid`);
        await queryRunner.query(`ALTER TABLE "gradesHistory" ADD CONSTRAINT "FK_e0a156a46290aeb81cd14232014" FOREIGN KEY ("schoolGradeId") REFERENCES "schoolGrades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gradesHistory" DROP CONSTRAINT "FK_e0a156a46290aeb81cd14232014"`);
        await queryRunner.query(`ALTER TABLE "gradesHistory" DROP COLUMN "schoolGradeId"`);
    }

}
