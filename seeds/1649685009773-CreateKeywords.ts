import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateKeywords1649685009773 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('keyword')
        .values([
            {
            id: 2,
            word: 'google',
            position: 1,
            lastposition: 2,
            siteId: 2,
            },
        ])
        .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
