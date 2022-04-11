import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { jwtConstants } from "../auth/constants/auth.constants";
import { getConfig } from "../config/database";
import { KeywordsModule } from "../keywords/keywords.module";
import { SitesModule } from "../sites/sites.module";
import { UsersModule } from "../users/users.module";
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from "../auth/strategies/google.strategy";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "../app.controller";
import { AppService } from "../app.service";

export class ModulesForLive {
    getModulesConfiguration() {
        return {
          imports: [
            ConfigModule.forRoot(),
            TypeOrmModule.forRoot(getConfig()),
            PassportModule,
            JwtModule.register({
              secret: jwtConstants.secret,
              signOptions: { expiresIn: '7d' },
            }),
            KeywordsModule,
            SitesModule,
            UsersModule,
            AuthModule
        ],
          controllers: [
            AppController
          ],
          providers: [
            AppService, 
            GoogleStrategy
          ],
        };
      }
}