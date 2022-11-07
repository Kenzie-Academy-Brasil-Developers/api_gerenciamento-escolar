import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTableHistory1667834386541 implements MigrationInterface {
    name = 'alterTableHistory1667834386541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gradesHistory" DROP CONSTRAINT "FK_ecdcfb4afba0a7d3b9709323899"`);
        await queryRunner.query(`ALTER TABLE "gradesHistory" DROP COLUMN "studentHistoryId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gradesHistory" ADD "studentHistoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "gradesHistory" ADD CONSTRAINT "FK_ecdcfb4afba0a7d3b9709323899" FOREIGN KEY ("studentHistoryId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
