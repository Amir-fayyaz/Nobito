import {
  JwtAccess_Name,
  JwtRefresh_Name,
  MaxAge_AccessToken,
  MaxAge_RefreshToken,
} from '@common/constants/constant';
import { Public } from '@common/decorators/is-public.decorator';
import { HashPasswordPipe } from '@common/pipes/hash-password.pipe';
import { setCookies } from '@common/utils/cookie';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginByEmailDto } from '../dto/login-by-email.dto';
import { RegisterByEmailDto } from '../dto/register-by-email.dto';
import { RegisterByPhoneDto } from '../dto/register-by-phone.dto';
import { VerifyByEmailDto } from '../dto/verify-by-email.dto';
import { VerifyByPhoneDto } from '../dto/verify-by-phone.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register-by-phone')
  async registerByPhone(@Body() dto: RegisterByPhoneDto) {
    return await this.authService.registerByPhone(dto);
  }

  @Post('verify-by-phone')
  async verifyByPhone(
    @Res() response: Response,
    @Body() dto: VerifyByPhoneDto,
  ) {
    const { accesstoken, refreshToken } =
      await this.authService.verifyByPhone(dto);

    setCookies(response, [
      {
        name: JwtAccess_Name,
        value: accesstoken,
        options: {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: MaxAge_AccessToken,
        },
      },
      {
        name: JwtRefresh_Name,
        value: refreshToken,
        options: {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: MaxAge_RefreshToken,
        },
      },
    ]);

    response.json({ success: true });
  }

  @Post('register-by-email')
  async registerByEmail(@Body(HashPasswordPipe) dto: RegisterByEmailDto) {
    return await this.authService.registerByEmail(dto);
  }

  @Post('verify-by-email')
  async verifyByEmail(
    @Body() dto: VerifyByEmailDto,
    @Res() response: Response,
  ) {
    const { accesstoken, refreshToken } =
      await this.authService.verifyByEmail(dto);

    setCookies(response, [
      {
        name: JwtAccess_Name,
        value: accesstoken,
        options: {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: MaxAge_AccessToken,
        },
      },
      {
        name: JwtRefresh_Name,
        value: refreshToken,
        options: {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: MaxAge_RefreshToken,
        },
      },
    ]);

    response.json({ success: true });
  }

  @Post('login-by-email')
  async login(@Body() dto: LoginByEmailDto, @Res() response: Response) {
    const { accesstoken, refreshToken } = await this.authService.login(dto);

    setCookies(response, [
      {
        name: JwtAccess_Name,
        value: accesstoken,
        options: {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: MaxAge_AccessToken,
        },
      },
      {
        name: JwtRefresh_Name,
        value: refreshToken,
        options: {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: MaxAge_RefreshToken,
        },
      },
    ]);

    response.json({ success: true });
  }
}
