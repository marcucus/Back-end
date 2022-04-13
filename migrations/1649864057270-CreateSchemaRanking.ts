import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateSchemaRanking1649864057270 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(
            `CREATE SCHEMA IF NOT EXISTS ranking;
            `,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
