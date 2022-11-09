import { MigrationInterface, QueryRunner } from "typeorm";

export class migrationTeste11668000736202 implements MigrationInterface {
    name = 'migrationTeste11668000736202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_3c18fc139e76692e3202a3dd97a"`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "REL_3c18fc139e76692e3202a3dd97"`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_3c18fc139e76692e3202a3dd97a" FOREIGN KEY ("registrationId") REFERENCES "professionals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_3c18fc139e76692e3202a3dd97a"`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "REL_3c18fc139e76692e3202a3dd97" UNIQUE ("registrationId")`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_3c18fc139e76692e3202a3dd97a" FOREIGN KEY ("registrationId") REFERENCES "professionals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
