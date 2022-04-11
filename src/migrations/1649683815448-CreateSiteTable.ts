import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateSiteTable1649683815448 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(
            `CREATE TABLE site (
                  id int varying PRIMARY KEY,
                  url character varying NOT NULL,
                  userId varying NOT NULL,
                  FOREIGN KEY ("userId") REFERENCES user.id(id),
              );
            `,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
