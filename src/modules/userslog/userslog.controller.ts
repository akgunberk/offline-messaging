import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserslogService } from './userslog.service';
import { CreateUserslogDto } from './dto/create-userslog.dto';
import { UpdateUserslogDto } from './dto/update-userslog.dto';

@Controller('userslog')
export class UserslogController {
  constructor(private readonly userslogService: UserslogService) {}

  @Post()
  create(@Body() createUserslogDto: CreateUserslogDto) {
    return this.userslogService.create(createUserslogDto);
  }

  @Get()
  findAll() {
    return this.userslogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userslogService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserslogDto: UpdateUserslogDto) {
    return this.userslogService.update(+id, updateUserslogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userslogService.remove(+id);
  }
}
