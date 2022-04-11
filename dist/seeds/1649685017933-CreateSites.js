"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSites1649685017933 = void 0;
class CreateSites1649685017933 {
    async up(queryRunner) {
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
    async down(queryRunner) {
    }
}
exports.CreateSites1649685017933 = CreateSites1649685017933;
//# sourceMappingURL=1649685017933-CreateSites.js.map