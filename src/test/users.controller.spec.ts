import { Test, TestingModule } from '@nestjs/testing';
import { KeywordsModule } from '../modules/keywords.module';
import { SitesModule } from '../modules/sites.module';
import { UsersRepository } from '../repositories/UsersRepository';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SitesModule, KeywordsModule],
      controllers: [UsersController],
      providers: [UsersService, UsersRepository],
      exports:[UsersService, UsersRepository],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
