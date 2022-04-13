import { Test, TestingModule } from '@nestjs/testing';
import { KeywordsController } from '../controllers/keywords.controller';
import { KeywordsService } from '../services/keywords.service';

describe('KeywordsController', () => {
  let controller: KeywordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeywordsController],
      providers: [KeywordsService],
    }).compile();

    controller = module.get<KeywordsController>(KeywordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
