import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { importJwtModule } from 'src/utils/import-jwt';
import { User, UserSchema } from '../schemas/user.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    importJwtModule(),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
