import { Module } from '@nestjs/common';
import { KeywordsService } from '../services/keywords.service';
import { KeywordsController } from '../controllers/keywords.controller';
import { KeywordsRepository } from '../repositories/KeywordsRepository'
import { SitesModule } from 'src/sites/sites.module';
import { UsersModule } from 'src/users/users.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [forwardRef(() => SitesModule)],
  controllers: [KeywordsController],
  providers: [KeywordsService, KeywordsRepository],
  exports: [KeywordsService, KeywordsRepository],
})
export class KeywordsModule {}