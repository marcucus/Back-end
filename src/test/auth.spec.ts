import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from '../auth/guards/jwt.strategy';
import { AuthController } from '../controllers/auth.controller';
import { UsersModule } from '../modules/users.module';
import { AuthService } from '../services/auth.service';

describe('Auth', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
      imports: [UsersModule],
    }).compile();

    service = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
