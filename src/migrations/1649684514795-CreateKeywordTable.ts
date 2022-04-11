import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateKeywordTable1649684514795 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(
            `CREATE TABLE keyword (
                  id int varying PRIMARY KEY,
                  word character varying NOT NULL,
                  position character varying,
                  lastposition character varying,
                  siteId varying NOT NULL,
                  FOREIGN KEY ("siteId") REFERENCES site.id(id),
              );
            `,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
