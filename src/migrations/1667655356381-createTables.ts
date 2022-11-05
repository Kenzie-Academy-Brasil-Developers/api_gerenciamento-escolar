import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1667655356381 implements MigrationInterface {
    name = 'createTables1667655356381'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "zipCode"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "cep" character varying(8) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "cep"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "zipCode" character varying(8) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "city" character varying NOT NULL`);
    }

}
