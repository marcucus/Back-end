"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModulesForLive = void 0;
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const auth_constants_1 = require("../auth/constants/auth.constants");
const database_1 = require("../config/database");
const keywords_module_1 = require("../keywords/keywords.module");
const sites_module_1 = require("../sites/sites.module");
const users_module_1 = require("../users/users.module");
const jwt_1 = require("@nestjs/jwt");
const google_strategy_1 = require("../auth/strategies/google.strategy");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("../app.controller");
const app_service_1 = require("../app.service");
class ModulesForLive {
    getModulesConfiguration() {
        return {
            imports: [
                config_1.ConfigModule.forRoot(),
                typeorm_1.TypeOrmModule.forRoot((0, database_1.getConfig)()),
                passport_1.PassportModule,
                jwt_1.JwtModule.register({
                    secret: auth_constants_1.jwtConstants.secret,
                    signOptions: { expiresIn: '7d' },
                }),
                keywords_module_1.KeywordsModule,
                sites_module_1.SitesModule,
                users_module_1.UsersModule,
                auth_module_1.AuthModule
            ],
            controllers: [
                app_controller_1.AppController
            ],
            providers: [
                app_service_1.AppService,
                google_strategy_1.GoogleStrategy
            ],
        };
    }
}
exports.ModulesForLive = ModulesForLive;
//# sourceMappingURL=ModulesForLive.js.map