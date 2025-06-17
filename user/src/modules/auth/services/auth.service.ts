import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterByPhoneType } from '../dto/registerByPhone.type';
import { OtpService } from './otp.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly otpService: OtpService,
  ) {}

  async registerByPhone({ phone }: RegisterByPhoneType) {
    const user = await this.userRepository.findOneBy({ phone });

    if (user) return { status: 409 };

    const { hashedOtp, otp } = await this.otpService.generateAndSend();

    return {
      otp,
      hashedOtp,
      status: 200,
    };
  }
}
