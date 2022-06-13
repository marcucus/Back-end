import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SitesModule } from '../modules/sites.module';
import { KeywordsRepository } from '../repositories/KeywordsRepository';
import { KeywordsController } from '../controllers/keywords.controller';
import { KeywordsService } from '../services/keywords.service';
import { Keyword } from 'src/entities/keyword.entity';

describe('KeywordsController', () => {
  let controller: KeywordsController;
  let service: KeywordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => SitesModule)],
      controllers: [KeywordsController],
      providers: [KeywordsService, KeywordsRepository],
      exports: [KeywordsService, KeywordsRepository],
    }).compile();

    controller = module.get<KeywordsController>(KeywordsController);
    service = module.get<KeywordsService>(KeywordsService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const id="1";
    const repository = new KeywordsRepository();
    const keywords = "google image";
    const country = "FR02";
    const site = null;
    const lastcheck=null;
    const createdAt =null;
    const search = 'Google';
    const keyword: Keyword = {
      id:"1",
      position:"",
      url:'',
      keywords,
      country,
      createdAt,
      search,
      siteid:site,
      lastcheck};

    await repository.create(keyword);
    expect(await repository.findOne(id)).toEqual(keyword);
  });
});
