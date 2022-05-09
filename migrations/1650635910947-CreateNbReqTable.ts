import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateNbReqTable1650635910947 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(
            `CREATE TABLE IF NOT EXISTS ranking.request (
                number int4
                proxy int4
              );
              INSERT INTO ranking.request ("number","proxy")
              VALUES (
                0,
                0
              );
            `,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
