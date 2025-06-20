import { MessagePattern, Payload } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtAppService } from '../services/jwt.service';

export enum JwtMessagePatterns {
  VERIFY_TOKEN = 'verify_token',
}

export interface VerifyTokenPayload {
  token: string;
}

export class JwtController {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
    private readonly jwtService: JwtAppService,
  ) {}

  @MessagePattern(JwtMessagePatterns.VERIFY_TOKEN)
  async verifyToken(@Payload() { token }: VerifyTokenPayload) {
    return await this.jwtService.verifyToken(token);
  }
}
