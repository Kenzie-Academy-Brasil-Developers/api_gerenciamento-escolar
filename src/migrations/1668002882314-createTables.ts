import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1668002882314 implements MigrationInterface {
    name = 'createTables1668002882314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "isPermission"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "isTeacher" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_3c18fc139e76692e3202a3dd97a"`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "REL_3c18fc139e76692e3202a3dd97"`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_3c18fc139e76692e3202a3dd97a" FOREIGN KEY ("registrationId") REFERENCES "professionals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_3c18fc139e76692e3202a3dd97a"`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "REL_3c18fc139e76692e3202a3dd97" UNIQUE ("registrationId")`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_3c18fc139e76692e3202a3dd97a" FOREIGN KEY ("registrationId") REFERENCES "professionals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "isTeacher"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "isPermission" boolean NOT NULL`);
    }

}
