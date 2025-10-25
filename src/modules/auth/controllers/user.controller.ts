import { SanitizeUserInterceptor } from '@common/interceptors/sanitize-user.interceptor';
import { HashPasswordPipe } from '@common/pipes/hash-password.pipe';
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @UseInterceptors(SanitizeUserInterceptor)
  async create(@Body(HashPasswordPipe) dto: CreateUserDto) {
    return await this.service.create(dto);
  }
}
