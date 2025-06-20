import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAppService } from '../services/jwt.service';

export enum JwtMessagePatterns {
  VERIFY_TOKEN = 'verify_token',
}

export interface VerifyTokenPayload {
  token: string;
}

export class JwtController {
  constructor(private readonly JwtService: JwtAppService) {}

  @MessagePattern(JwtMessagePatterns.VERIFY_TOKEN)
  async verifyToken(@Payload() { token }: VerifyTokenPayload) {
    return await this.JwtService.verifyToken(token);
  }
}
