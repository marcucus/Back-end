import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SitesController } from '../controllers/sites.controller';
import { KeywordsModule } from '../modules/keywords.module';
import { SitesRepository } from '../repositories/SitesRepository';
import { SitesService } from '../services/sites.service';

describe('SitesService', () => {
  let service: SitesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => KeywordsModule)],
      controllers: [SitesController],
      providers: [SitesService,SitesRepository],
      exports: [SitesService],
    }).compile();

    service = module.get<SitesService>(SitesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
