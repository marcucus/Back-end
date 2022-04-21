import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateSiteTable1649683815448 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(
            `CREATE TABLE IF NOT EXISTS ranking.site (
                  id character varying PRIMARY KEY,
                  url character varying NOT NULL,
                  userId character varying NOT NULL,
                  FOREIGN KEY ("userId") REFERENCES user.id(id)
              );
            `,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
