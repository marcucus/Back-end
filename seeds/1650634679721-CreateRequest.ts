import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateRequest1650634679721 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `
              INSERT INTO "request" ("number")
              VALUES (
                0
              );
            `,
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
