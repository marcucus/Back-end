"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSiteTable1649683815448 = void 0;
class CreateSiteTable1649683815448 {
    async up(queryRunner) {
        return queryRunner.query(`CREATE TABLE site (
                  id int varying PRIMARY KEY,
                  url character varying NOT NULL,
                  userId varying NOT NULL,
                  FOREIGN KEY ("userId") REFERENCES user.id(id),
              );
            `);
    }
    async down(queryRunner) {
    }
}
exports.CreateSiteTable1649683815448 = CreateSiteTable1649683815448;
//# sourceMappingURL=1649683815448-CreateSiteTable.js.map