import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiOkResponse } from '@nestjs/swagger';
import { PaginatedUserResponse } from './dto/paginated-user.response.dto';
import { User } from './models/user.model';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  @ApiOkResponse({ type: PaginatedUserResponse })
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.UserService.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: User })
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    return await this.UserService.findOneById(id);
  }
}
