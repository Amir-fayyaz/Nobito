import { SanitizeUserInterceptor } from '@common/interceptors/sanitize-user.interceptor';
import { HashPasswordPipe } from '@common/pipes/hash-password.pipe';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from '../services/user.service';

@Controller('users')
@UseInterceptors(SanitizeUserInterceptor)
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  async create(@Body(HashPasswordPipe) dto: CreateUserDto) {
    return await this.service.create(dto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.findOne(id);
  }
}
