import { Test, TestingModule } from '@nestjs/testing';
import { UserslogService } from './userslog.service';

describe('UserslogService', () => {
  let service: UserslogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserslogService],
    }).compile();

    service = module.get<UserslogService>(UserslogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
