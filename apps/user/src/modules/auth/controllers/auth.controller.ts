import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from '../services/auth.service';
import { RegisterByPhoneType } from '../dto/registerByPhone.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VerifyByPhone } from '../dto/verifyByPhone.type';
import { RegisterByEmail } from '../dto/registerByEmail.type';
import { VerifyByEmail } from '../dto/verify-by-email.type';
import { User } from '../../user/entities/user.entity';
import { AuthMessages } from 'libs/message-patterns';

export class AuthController {
  constructor(
    private readonly AuthService: AuthService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  @MessagePattern(AuthMessages.REGISTER_BY_PHONE)
  async registerByPhone(@Payload() data: RegisterByPhoneType) {
    return await this.AuthService.registerByPhone(data);
  }

  @MessagePattern(AuthMessages.VERIFY_BY_PHONE)
  async verifyByPhone(@Payload() data: VerifyByPhone) {
    return await this.AuthService.verifyByPhone(data);
  }

  @MessagePattern(AuthMessages.REGISTER_BY_EMAIL)
  async registerByEmail(@Payload() data: RegisterByEmail) {
    return await this.AuthService.registerByEmail(data);
  }

  @MessagePattern(AuthMessages.VERIFY_BY_EMAIL)
  async verifyByEmail(@Payload() data: VerifyByEmail) {
    return await this.AuthService.verfiyByEmail(data);
  }
}
