import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1667925431326 implements MigrationInterface {
    name = 'createTables1667925431326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teachers" ADD "idAddressId" uuid`);
        await queryRunner.query(`ALTER TABLE "teachers" ADD CONSTRAINT "UQ_d59fad21ec4612ec98a79e1b925" UNIQUE ("idAddressId")`);
        await queryRunner.query(`ALTER TABLE "teachers" ADD CONSTRAINT "FK_d59fad21ec4612ec98a79e1b925" FOREIGN KEY ("idAddressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teachers" DROP CONSTRAINT "FK_d59fad21ec4612ec98a79e1b925"`);
        await queryRunner.query(`ALTER TABLE "teachers" DROP CONSTRAINT "UQ_d59fad21ec4612ec98a79e1b925"`);
        await queryRunner.query(`ALTER TABLE "teachers" DROP COLUMN "idAddressId"`);
    }

}
