import { MigrationInterface, QueryRunner } from "typeorm";

export class migrationTeste1667999147966 implements MigrationInterface {
    name = 'migrationTeste1667999147966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" RENAME COLUMN "isPermission" TO "isTeacher"`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "isTeacher" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "isTeacher" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "students" RENAME COLUMN "isTeacher" TO "isPermission"`);
    }

}
