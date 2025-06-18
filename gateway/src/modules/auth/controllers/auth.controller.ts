import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterByPhone } from '../dto/register-by-phone.dto';
import { VerifyByPhoneDto } from '../dto/verify-by-phone.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('regiser_by_phone')
  async registerByPhone(@Body() dto: RegisterByPhone) {
    return await this.AuthService.registerByPhone(dto);
  }

  @Post('verify_by_phone')
  async verifyByPhone(@Body() dto: VerifyByPhoneDto) {
    return await this.AuthService.verifyByPhone(dto);
  }
}
