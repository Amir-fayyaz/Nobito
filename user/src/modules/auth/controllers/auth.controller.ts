import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from '../services/auth.service';
import { AuthMessages } from 'src/common/message-patterns/auth-messages';
import { RegisterByPhoneType } from '../dto/registerByPhone.type';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { VerifyByPhone } from '../dto/verifyByPhone.type';

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
}
