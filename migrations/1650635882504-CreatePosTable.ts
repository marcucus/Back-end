import { MigrationInterface, QueryRunner } from "typeorm"

export class CreatePosTable1650635882504 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(
            `CREATE TABLE IF NOT EXISTS ranking.positions (
                  id serial4  PRIMARY KEY,
                  lastposition character varying,
                  keywordId int4 NOT NULL,
                  "date" timestamp,
                  FOREIGN KEY (keywordId) REFERENCES ranking.keywords(id) ON DELETE CASCADE
              );
            `,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
