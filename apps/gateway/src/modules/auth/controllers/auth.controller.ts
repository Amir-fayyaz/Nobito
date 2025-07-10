import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterByPhone } from '../dto/register-by-phone.dto';
import { VerifyByPhoneDto } from '../dto/verify-by-phone.dto';
import { RegisterByEmail } from '../dto/register-by-email.dto';
import { VerifyByEmail } from '../dto/verify-by-email.dto';

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

  @Post('register_by_email')
  async registerByEmail(@Body() dto: RegisterByEmail) {
    return await this.AuthService.registerByEmail(dto);
  }

  @Post('verify_by_email')
  async verifyByEmail(@Body() dto: VerifyByEmail) {
    return await this.AuthService.verifyByEmail(dto);
  }
}
