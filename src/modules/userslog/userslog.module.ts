import { Module } from '@nestjs/common';
import { UserslogService } from './userslog.service';
import { UserslogController } from './userslog.controller';

@Module({
  controllers: [UserslogController],
  providers: [UserslogService],
})
export class UserslogModule {}
