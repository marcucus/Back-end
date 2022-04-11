import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SitesModule } from './sites/sites.module';
import { Site } from './entities/site.entity';
import { KeywordsModule } from './keywords/keywords.module';
import { Keyword } from './entities/keyword.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './entities/user.entity';
import { GoogleStrategy } from './auth/strategies/google.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants/auth.constants';
import { ModulesForLive } from './modules/ModulesForLive';

const buildModules = new ModulesForLive();

@Module(buildModules.getModulesConfiguration())

/*@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      synchronize: true,
      entities:[Site,Keyword,User],
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
    SitesModule,
    KeywordsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})*/

export class AppModule {}
