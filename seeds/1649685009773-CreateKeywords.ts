import { timestamp } from "rxjs";
import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateKeywords1649685009773 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('keyword')
        .values([
            {
            id: 1,
            position: 1,
            siteId: 1,
            keywords: 'google',
            },
        ])
        .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
