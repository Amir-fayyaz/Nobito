import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.UserService.findAll(query);
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    return await this.UserService.findOneById(id);
  }
}
