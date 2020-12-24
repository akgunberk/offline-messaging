import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/modules/users/dto';
import { User, UserDocument } from '../schemas/user.schema';
import { BcryptService } from '../../utils/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly bcryptServices: BcryptService,
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
  ) {}

  async createUser({ password, ...rest }: UserDto) {
    return this.UserModel.create({
      password: await this.bcryptServices.hashPassword(password),
      ...rest,
    })
      .then(async (res) => {
        const { password, username } = res.toObject();
        return await this.bcryptServices.generateJwt({ username, password });
      })
      .catch((err) => {
        if (err.name === 'MongoError' && err.code === 11000) {
          throw new HttpException('User already exist!', HttpStatus.CONFLICT);
        }

        throw new HttpException('Somethings got wrong', HttpStatus.BAD_REQUEST);
      });
  }

  async getUsers() {
    return this.UserModel.find().lean().exec();
  }

  async register(user: UserDto) {
    const password = await this.bcryptServices.hashPassword(user.password);
    await this.UserModel.create({ ...user, password });
    return await this.bcryptServices.generateJwt(user);
  }

  async findOneByEmail(email: string) {
    return await this.UserModel.findOne({ email });
  }

  async findById(id: string) {
    return await this.UserModel.findOne({ _id: id });
  }

  async findByUsername(username: string) {
    return await this.UserModel.findOne({ username });
  }

  async deleteOne(user: UserDto) {
    return await this.UserModel.findOneAndDelete({ email: user.email });
  }

  async findAll() {
    return await this.UserModel.find().lean();
  }

  async findOneAndUpdate(user: UserDto) {
    return await this.UserModel.findOneAndUpdate(
      { email: user.email },
      { password: await this.bcryptServices.hashPassword(user.password) },
      { new: true },
    );
  }
}
