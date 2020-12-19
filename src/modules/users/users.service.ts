import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dtos';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
  ) {}

  private readonly logger = new Logger(UsersService.name);

  async createUser({ password, ...rest }: UserDto) {
    return this.UserModel.create({
      password: await this.hashPassword(password),
      ...rest,
    })
      .then(async (res) => {
        const { password, username } = res.toObject();
        return await this.generateJwt({ username, password });
      })
      .catch((err) => {
        if (err.name === 'MongoError' && err.code === 11000) {
          throw new HttpException('User already exist!', HttpStatus.CONFLICT);
        }

        this.logger.error(err);

        throw new HttpException('Somethings got wrong', HttpStatus.BAD_REQUEST);
      });
  }

  async getUsers() {
    return this.UserModel.find().lean().exec();
  }

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  comparePasswords(password: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(password, encrypted);
  }

  generateJwt(user: { username: string; password: string }): Promise<string> {
    return this.jwtService.signAsync(user);
  }

  async register(user: UserDto) {
    const password = await this.hashPassword(user.password);
    await this.UserModel.create({ ...user, password });
    return await this.generateJwt(user);
  }

  async findOneByEmail(email: string) {
    return await this.UserModel.findOne({ email });
  }

  async findById(id: number) {
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
      { password: await this.hashPassword(user.password) },
      { new: true },
    );
  }
}
