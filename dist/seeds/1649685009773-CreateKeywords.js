"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateKeywords1649685009773 = void 0;
class CreateKeywords1649685009773 {
    async up(queryRunner) {
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
                siteId: 'site:base',
            },
        ])
            .execute();
    }
    async down(queryRunner) {
    }
}
exports.CreateKeywords1649685009773 = CreateKeywords1649685009773;
//# sourceMappingURL=1649685009773-CreateKeywords.js.map