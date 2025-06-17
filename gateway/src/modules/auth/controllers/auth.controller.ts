import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterByPhone } from '../dto/register-by-phone.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@CacheTTL(300)
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('regiser_by_phone')
  async registerByPhone(@Body() dto: RegisterByPhone) {
    return await this.AuthService.registerByPhone(dto);
  }
}
