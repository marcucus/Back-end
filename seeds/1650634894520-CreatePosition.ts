import { MigrationInterface, QueryRunner } from "typeorm"

export class CreatePosition1650634894520 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
        `
            INSERT INTO "position" ("lastPosition","date","keywordId")
            VALUES (
                1,
                NOW()::TIMESTAMP,
                1
            );
        `,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
