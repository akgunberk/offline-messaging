import { Test, TestingModule } from '@nestjs/testing';
import { UserslogController } from './userslog.controller';
import { UserslogService } from './userslog.service';

describe('UserslogController', () => {
  let controller: UserslogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserslogController],
      providers: [UserslogService],
    }).compile();

    controller = module.get<UserslogController>(UserslogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
