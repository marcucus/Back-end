import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { KeywordsModule } from '../modules/keywords.module';
import { SitesRepository } from '../repositories/SitesRepository';
import { SitesController } from '../controllers/sites.controller';
import { SitesService } from '../services/sites.service';

describe('SitesController', () => {
  let controller: SitesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => KeywordsModule)],
      controllers: [SitesController],
      providers: [SitesService,SitesRepository],
      exports: [SitesService],
    }).compile();

    controller = module.get<SitesController>(SitesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
