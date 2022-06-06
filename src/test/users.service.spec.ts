import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../controllers/users.controller';
import { KeywordsModule } from '../modules/keywords.module';
import { SitesModule } from '../modules/sites.module';
import { UsersRepository } from '../repositories/UsersRepository';
import { UsersService } from '../services/users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SitesModule, KeywordsModule],
      controllers: [UsersController],
      providers: [UsersService, UsersRepository],
      exports:[UsersService, UsersRepository],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
