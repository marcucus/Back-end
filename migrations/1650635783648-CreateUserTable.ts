import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUserTable1650635783648 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(
            `CREATE TABLE IF NOT EXISTS ranking.users (
                  id serial4 PRIMARY KEY,
                  email character varying NOT NULL,
                  firstname character varying,
                  lastname character varying,
                  picture character varying,
                  CONSTRAINT unique_email UNIQUE (email)
              );
            `,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
