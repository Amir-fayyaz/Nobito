import { Body, Controller, Post } from '@nestjs/common';
import { RegisterByPhoneDto } from '../dto/register-by-phone.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register-by-phone')
  async registerByPhone(@Body() dto: RegisterByPhoneDto) {
    return await this.authService.registerByPhone(dto);
  }
}
