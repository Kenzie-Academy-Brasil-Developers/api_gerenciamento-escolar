import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1667925237483 implements MigrationInterface {
    name = 'createTables1667925237483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teachers" DROP CONSTRAINT "FK_d59fad21ec4612ec98a79e1b925"`);
        await queryRunner.query(`ALTER TABLE "teachers" DROP COLUMN "idAddressId"`);
        await queryRunner.query(`ALTER TABLE "professionals" DROP CONSTRAINT "FK_e9ee0c7a4fecd3c28f69cd39034"`);
        await queryRunner.query(`ALTER TABLE "professionals" ADD CONSTRAINT "UQ_e9ee0c7a4fecd3c28f69cd39034" UNIQUE ("idAddressId")`);
        await queryRunner.query(`ALTER TABLE "professionals" ADD CONSTRAINT "FK_e9ee0c7a4fecd3c28f69cd39034" FOREIGN KEY ("idAddressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "professionals" DROP CONSTRAINT "FK_e9ee0c7a4fecd3c28f69cd39034"`);
        await queryRunner.query(`ALTER TABLE "professionals" DROP CONSTRAINT "UQ_e9ee0c7a4fecd3c28f69cd39034"`);
        await queryRunner.query(`ALTER TABLE "professionals" ADD CONSTRAINT "FK_e9ee0c7a4fecd3c28f69cd39034" FOREIGN KEY ("idAddressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teachers" ADD "idAddressId" uuid`);
        await queryRunner.query(`ALTER TABLE "teachers" ADD CONSTRAINT "FK_d59fad21ec4612ec98a79e1b925" FOREIGN KEY ("idAddressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
