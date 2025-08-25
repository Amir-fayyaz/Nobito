import { CacheService } from '@common/services/cache.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterByPhoneDto } from '../dto/register-by-phone.dto';
import { User } from '../entities/user.entity';
import { OtpService } from './otp.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly cacheService: CacheService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly otpService: OtpService,
  ) {}

  /**
   *
   * @param RegisterByPhoneDto
   * @returns  five digit otp (without sms-service for development)
   */
  async registerByPhone({ phone }: RegisterByPhoneDto) {
    const isOtpSent = await this.cacheService.get(`phone:${phone}`);

    if (isOtpSent)
      throw new HttpException(
        'otp sent before !',
        HttpStatus.TOO_MANY_REQUESTS,
      );

    const newUser = this.userRepository.create({ phone });

    await this.userRepository.save(newUser);

    return await this.otpService.sendOtp(phone);
  }
}
