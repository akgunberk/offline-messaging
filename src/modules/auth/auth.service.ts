import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BcryptService } from 'src/utils/bcrypt.service';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private bcryptService: BcryptService,
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
  ) {}

  async validateUser(username: string, pass: string): Promise<boolean> {
    const user = await this.UserModel.findOne({ username }).exec();
    if (
      user &&
      (await this.bcryptService.comparePasswords(pass, user.password))
    ) {
      return true;
    }
    return false;
  }
}
