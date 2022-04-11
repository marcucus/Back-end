"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateKeywordTable1649684514795 = void 0;
class CreateKeywordTable1649684514795 {
    async up(queryRunner) {
        return queryRunner.query(`CREATE TABLE keyword (
                  id int varying PRIMARY KEY,
                  word character varying NOT NULL,
                  position character varying,
                  lastposition character varying,
                  siteId varying NOT NULL,
                  FOREIGN KEY ("siteId") REFERENCES site.id(id),
              );
            `);
    }
    async down(queryRunner) {
    }
}
exports.CreateKeywordTable1649684514795 = CreateKeywordTable1649684514795;
//# sourceMappingURL=1649684514795-CreateKeywordTable.js.map