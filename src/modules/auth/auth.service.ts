import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dtos';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}
  private readonly logger = new Logger(AuthService.name);

  async validateUser(username: string, pass: string): Promise<UserDto> {
    const user = await this.UserModel.findOne({ username }).exec();
    this.logger.log(user);
    if (user && user.password === pass) {
      delete user.password;
      return user;
    }
    return null;
  }
}
