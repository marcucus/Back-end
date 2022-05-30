import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth.module";
import { jwtConstants } from "../auth/constants/auth.constants";
import { getConfig } from "../config/database";
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from "../auth/strategies/google.strategy";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "../app.controller";
import { AppService } from "../app.service";
import { ScheduleModule } from "@nestjs/schedule";

export const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

export class ModulesForLive {
    getModulesConfiguration() {
        return {
          imports: [
            ConfigModule.forRoot(),
            TypeOrmModule.forRoot(getConfig()),
            passportModule,
            PassportModule,
            JwtModule.register({
              secret: jwtConstants.secret,
              signOptions: { expiresIn: '7d' },
            }),
            AuthModule,
            ScheduleModule.forRoot()

        ],
        providers: [
            AppService, 
            GoogleStrategy
          ],
          controllers: [
            AppController,
          ],
          
        };
      }
}