"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserTable1649683630915 = void 0;
class CreateUserTable1649683630915 {
    async up(queryRunner) {
        return queryRunner.query(`CREATE TABLE user (
                  id int varying PRIMARY KEY,
                  email character varying NOT NULL,
                  firstname character varying,
                  lastname character varying,
                  picture character varying,
              );
            `);
    }
    async down(queryRunner) {
    }
}
exports.CreateUserTable1649683630915 = CreateUserTable1649683630915;
//# sourceMappingURL=1649683630915-CreateUserTable.js.map