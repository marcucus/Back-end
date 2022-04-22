import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUsers1649685013978 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('user')
        .values([
            {
            id: 1,
            email: 'user@base.com',
            firstname: 'user',
            lastname: 'base',
            picture: 'https://lh3.googleusercontent.com/a/AATXAJz_qvrK6eMl7SbjtMNGszXt6j7OYtjTkFkNesFd=s96',
            },
        ])
        .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
