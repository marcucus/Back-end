import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUserTable1649683630915 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(
            `CREATE TABLE IF NOT EXISTS ranking.user (
                  id character varying PRIMARY KEY,
                  email character varying NOT NULL,
                  firstname character varying,
                  lastname character varying,
                  picture character varying
              );
            `,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}


