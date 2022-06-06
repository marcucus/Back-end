import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { KeywordsController } from '../controllers/keywords.controller';
import { SitesModule } from '../modules/sites.module';
import { KeywordsRepository } from '../repositories/KeywordsRepository';
import { KeywordsService } from '../services/keywords.service';

describe('KeywordsService', () => {
  let service: KeywordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => SitesModule)],
      controllers: [KeywordsController],
      providers: [KeywordsService, KeywordsRepository],
      exports: [KeywordsService, KeywordsRepository],
    }).compile();

    service = module.get<KeywordsService>(KeywordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
