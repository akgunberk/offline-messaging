import { Injectable } from '@nestjs/common';
import { CreateUserslogDto } from './dto/create-userslog.dto';
import { UpdateUserslogDto } from './dto/update-userslog.dto';

@Injectable()
export class UserslogService {
  create(createUserslogDto: CreateUserslogDto) {
    return 'This action adds a new userslog';
  }

  findAll() {
    return `This action returns all userslog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userslog`;
  }

  update(id: number, updateUserslogDto: UpdateUserslogDto) {
    return `This action updates a #${id} userslog`;
  }

  remove(id: number) {
    return `This action removes a #${id} userslog`;
  }
}
