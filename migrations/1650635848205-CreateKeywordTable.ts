import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateKeywordTable1650635848205 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(
            `CREATE TABLE IF NOT EXISTS ranking.keywords (
                  id serial4  PRIMARY KEY,
                  position character varying,
                  keywords character varying NOT NULL,
                  siteId int4 NOT NULL,
                  "lastcheck" timestamp,
                  FOREIGN KEY (siteId) REFERENCES ranking.sites(id) ON DELETE CASCADE
              );
            `,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
