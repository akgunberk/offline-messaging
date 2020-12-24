import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { UserDto } from 'src/modules/users/dto';
import { Public, UseLocalStrategy } from 'src/utils/custom-decorators';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}

  @Public()
  @Post('register')
  async registerUser(@Body() user: UserDto) {
    return await this.userService.register(user);
  }

  @UseLocalStrategy()
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  @Public()
  @Post()
  async createUser(@Body() user: UserDto): Promise<string> {
    return await this.userService.createUser(user);
  }

  @Get()
  async getUser(): Promise<UserDto[]> {
    return this.userService.getUsers();
  }
}
