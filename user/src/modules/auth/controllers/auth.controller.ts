import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from '../services/auth.service';
import { AuthMessages } from 'src/common/message-patterns/auth-messages';
import { RegisterByPhoneType } from '../dto/registerByPhone.type';

export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @MessagePattern(AuthMessages.REGISTER_BY_PHONE)
  async registerByPhone(@Payload() data: RegisterByPhoneType) {
    return await this.AuthService.registerByPhone(data);
  }
}
