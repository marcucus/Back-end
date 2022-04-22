import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateSiteTable1650635820053 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(
            `CREATE TABLE IF NOT EXISTS ranking.sites (
                  id serial4  PRIMARY KEY,
                  url character varying NOT NULL,
                  userId int4 NOT NULL,
                  FOREIGN KEY (userId) REFERENCES ranking.users(id) ON DELETE CASCADE
              );
            `,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
