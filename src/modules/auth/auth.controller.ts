import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from 'src/dtos';
import { Public, UseLocalStrategy } from 'src/utils/custom-decorators';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}

  @UseLocalStrategy()
  @Post('login')
  async login(@Body() user: UserDto) {
    console.log('here');
    return user;
  }

  @Public()
  @Post()
  async createUser(@Body() user: UserDto): Promise<string> {
    return await this.userService.createUser(user);
  }

  @Public()
  @Get()
  async getUser(): Promise<UserDto[]> {
    return this.userService.getUsers();
  }
}
