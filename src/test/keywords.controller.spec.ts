import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SitesModule } from '../modules/sites.module';
import { KeywordsRepository } from '../repositories/KeywordsRepository';
import { KeywordsController } from '../controllers/keywords.controller';
import { KeywordsService } from '../services/keywords.service';

describe('KeywordsController', () => {
  let controller: KeywordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => SitesModule)],
      controllers: [KeywordsController],
      providers: [KeywordsService, KeywordsRepository],
      exports: [KeywordsService, KeywordsRepository],
    }).compile();

    controller = module.get<KeywordsController>(KeywordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
