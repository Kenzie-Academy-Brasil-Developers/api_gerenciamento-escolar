import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTables1667831482900 implements MigrationInterface {
    name = 'AlterTables1667831482900'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schoolGrades" DROP CONSTRAINT "FK_eff5469e836981f6061c15f885f"`);
        await queryRunner.query(`ALTER TABLE "schoolGrades" ADD CONSTRAINT "UQ_eff5469e836981f6061c15f885f" UNIQUE ("registrationId")`);
        await queryRunner.query(`ALTER TABLE "schoolGrades" ADD CONSTRAINT "FK_eff5469e836981f6061c15f885f" FOREIGN KEY ("registrationId") REFERENCES "professionals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schoolGrades" DROP CONSTRAINT "FK_eff5469e836981f6061c15f885f"`);
        await queryRunner.query(`ALTER TABLE "schoolGrades" DROP CONSTRAINT "UQ_eff5469e836981f6061c15f885f"`);
        await queryRunner.query(`ALTER TABLE "schoolGrades" ADD CONSTRAINT "FK_eff5469e836981f6061c15f885f" FOREIGN KEY ("registrationId") REFERENCES "professionals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
