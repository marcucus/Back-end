import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SitesService } from './sites.service';
import { SitesController } from './sites.controller';
import { Sites, SitesRepository } from './entities/site.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sites])],
  controllers: [SitesController],
  providers: [SitesService, SitesRepository],
  exports: [SitesService],
})
export class SitesModule {}
