import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/common/@types/token-payload.type';
@Injectable()
export class JwtAppService {
  constructor(
    private readonly JwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(payload: JwtPayload): Promise<string> {
    return await this.JwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRE'),
    });
  }

  async verifyToken(
    token: string,
  ): Promise<JwtPayload | { status: number; message: string }> {
    try {
      const payload: JwtPayload = await this.JwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      return payload;
    } catch (error) {
      return { status: 401, message: error.message };
    }
  }
}
