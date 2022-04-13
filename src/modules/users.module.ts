import { Module } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UsersController } from '../controllers/users.controller';
import { UsersRepository } from 'src/repositories/UsersRepository';
import { SitesModule } from './sites.module';
import { KeywordsModule } from './keywords.module';

@Module({
  imports: [SitesModule, KeywordsModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports:[UsersService, UsersRepository],
})
export class UsersModule {}