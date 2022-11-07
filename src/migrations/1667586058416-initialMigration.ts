import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1667586058416 implements MigrationInterface {
    name = 'initialMigration1667586058416'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teachers" RENAME COLUMN "isPermission" TO "isTeacher"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teachers" RENAME COLUMN "isTeacher" TO "isPermission"`);
    }

}
