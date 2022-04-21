import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateKeywordTable1649684514795 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(
            `CREATE TABLE IF NOT EXISTS ranking.keyword (
                  id character varying PRIMARY KEY,
                  word character varying NOT NULL,
                  position character varying,
                  lastposition character varying,
                  siteId character varying NOT NULL,
                  lastChek date varying,
                  FOREIGN KEY ("siteId") REFERENCES site.id(id)
              );
            `,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
