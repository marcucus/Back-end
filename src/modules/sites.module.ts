import { Module } from '@nestjs/common';
import { SitesService } from '../services/sites.service';
import { SitesController } from '../controllers/sites.controller';
import { SitesRepository } from '../repositories/SitesRepository';
import { KeywordsModule } from './keywords.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [forwardRef(() => KeywordsModule)],
  controllers: [SitesController],
  providers: [SitesService,SitesRepository],
  exports: [SitesService],
})
export class SitesModule {}