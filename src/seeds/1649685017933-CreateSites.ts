import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateSites1649685017933 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('site')
            .values([
                {
                id: 2,
                url: 'http://www.google.fr/',
                },
            ])
            .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
