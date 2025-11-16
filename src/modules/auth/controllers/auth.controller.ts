import { HashPasswordPipe } from '@common/pipes/hash-password.pipe';
import { Body, Controller, Post } from '@nestjs/common';
import { RegisterByPhoneDto } from '../dto/register-by-phone.dto';
import { AuthService } from '../services/auth.service';

@Controller('users')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register-by-phone')
  async registerByPhone(@Body(HashPasswordPipe) dto: RegisterByPhoneDto) {
    return await this.service.registerByPhone(dto);
  }
}
