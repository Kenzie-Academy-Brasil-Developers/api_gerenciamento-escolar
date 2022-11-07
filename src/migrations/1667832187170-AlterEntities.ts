import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterEntities1667832187170 implements MigrationInterface {
    name = 'AlterEntities1667832187170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gradesHistory" ADD "gradeId" uuid`);
        await queryRunner.query(`ALTER TABLE "gradesHistory" ADD CONSTRAINT "FK_9c8ea79ef16d33b17c622912f09" FOREIGN KEY ("gradeId") REFERENCES "grades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gradesHistory" DROP CONSTRAINT "FK_9c8ea79ef16d33b17c622912f09"`);
        await queryRunner.query(`ALTER TABLE "gradesHistory" DROP COLUMN "gradeId"`);
    }

}
