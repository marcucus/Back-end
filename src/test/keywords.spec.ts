import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SitesModule } from '../modules/sites.module';
import { KeywordsRepository } from '../repositories/KeywordsRepository';
import { KeywordsController } from '../controllers/keywords.controller';
import { KeywordsService } from '../services/keywords.service';
import { Keyword } from 'src/entities/keyword.entity';
import { UpdateKeywordDto } from 'src/dto/keywords/update-keyword.dto';

describe('Keywords', () => {
  let controller: KeywordsController;
  let service: KeywordsService;
  let repository:KeywordsRepository;

  const keyword: Keyword = {
    id:"1",
    position:"1",
    url:'',
    keywords:"google image",
    country:"FR02",
    createdAt:null,
    search:'Google',
    siteid:null,
    lastcheck:null
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => SitesModule)],
      controllers: [KeywordsController],
      providers: [KeywordsService, KeywordsRepository],
      exports: [KeywordsService, KeywordsRepository],
    }).compile();

    controller = module.get<KeywordsController>(KeywordsController);
    service = module.get<KeywordsService>(KeywordsService)
    repository = module.get<KeywordsRepository>(KeywordsRepository)
  });

  it('should create a keyword', async () => {
    const res = await repository.create(keyword);
    expect(res);
  });

  it('should update a keyword', async () => {
    const id='1';
    const keyUp : UpdateKeywordDto ={
        keywords:'test',
    }
    const res = await repository.update(id,keyUp);
    expect(res);
  });

  it('should check a keyword', async () => {
    const res = await repository.checkAuto();
    expect(res);
  });

  
  it('should delete a keyword', async () => {
    const id = '1';
    const res = await repository.delete(id);
    expect(res);
  });

});
