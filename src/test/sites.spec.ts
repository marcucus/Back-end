import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { KeywordsModule } from '../modules/keywords.module';
import { SitesRepository } from '../repositories/SitesRepository';
import { SitesController } from '../controllers/sites.controller';
import { SitesService } from '../services/sites.service';
import { Site } from 'src/entities/site.entity';
import { UpdateSiteDto } from 'src/dto/sites/update-site.dto';

describe('Sites', () => {
  let controller: SitesController;
  let service: SitesService;
  let repository: SitesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => KeywordsModule)],
      controllers: [SitesController],
      providers: [SitesService,SitesRepository],
      exports: [SitesService],
    }).compile();

    controller = module.get<SitesController>(SitesController);
    service = module.get<SitesService>(SitesService);
    repository = module.get<SitesRepository>(SitesRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a site', async () => {
    let req:any={
        rawHeaders:[{"Bearer":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI2LCJlbWFpbCI6Im1hcnF1ZXNsYXcxOUBnbWFpbC5jb20iLCJpYXQiOjE2NTQ1MjY1NjYsImV4cCI6MTY1NTEzMTM2Nn0.umpLWlFTGE-_YlRqy4BG9h7C-hTEJwhkud_H8HYgtSU"},]
    };
    const site:Site = {
        id:'1',
        url:null,
        userid:null,
    }
    const res = await repository.create(site,req);
    expect(res);
  });

  it('should update a site', async () => {
    const updateSite:UpdateSiteDto = {
        url:'test2.fr',
    }
    const id = '1';
    const res = await repository.update(id,updateSite);
    expect(res);
    });

  it('should delete a site', async () => {
    const id = '1';
    const res = await repository.delete(id);
    expect(res);
  });
});
