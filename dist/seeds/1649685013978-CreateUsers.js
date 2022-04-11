"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsers1649685013978 = void 0;
class CreateUsers1649685013978 {
    async up(queryRunner) {
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('user')
            .values([
            {
                id: 2,
                email: 'user@base.com',
                firstname: 'user',
                lastname: 'base',
                picture: 'https://lh3.googleusercontent.com/a/AATXAJz_qvrK6eMl7SbjtMNGszXt6j7OYtjTkFkNesFd=s96',
            },
        ])
            .execute();
    }
    async down(queryRunner) {
    }
}
exports.CreateUsers1649685013978 = CreateUsers1649685013978;
//# sourceMappingURL=1649685013978-CreateUsers.js.map