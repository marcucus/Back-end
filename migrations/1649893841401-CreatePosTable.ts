import { MigrationInterface, QueryRunner } from "typeorm"

export class CreatePosTable1649893841401 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(
            `CREATE TABLE IF NOT EXISTS ranking.position (
                  id character varying PRIMARY KEY,
                  position character varying,
                  date date varying,
                  keywordId character varying NOT NULL,
                  FOREIGN KEY ("keywordId") REFERENCES keyword.id(id)
              );
            `,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
