import { CacheService } from '@common/services/cache.service';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterByPhoneDto } from '../dto/register-by-phone.dto';
import { VerifyByPhoneDto } from '../dto/verify-by-phone.dto';
import { User } from '../entities/user.entity';
import { JwtAppService } from './jwt.service';
import { OtpService } from './otp.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly cacheService: CacheService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly otpService: OtpService,
    private readonly jwtAppService: JwtAppService,
    private readonly userService: UserService,
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

    const user = await this.userRepository.findOne({ where: { phone } });

    if (!user) {
      const newUser = this.userRepository.create({ phone });

      await this.userRepository.save(newUser);

      return await this.otpService.sendOtp(phone);
    } else {
      return await this.otpService.sendOtp(phone);
    }
  }

  async verifyByPhone(dto: VerifyByPhoneDto) {
    const otp = await this.cacheService.get(`phone:${dto.phone}`);

    if (!otp) throw new BadRequestException('Otp not found');
    if (otp && otp !== dto.otp) throw new BadRequestException('Wrong otp');

    const user = await this.userRepository.findOne({
      where: { phone: dto.phone },
    });

    if (!user) throw new NotFoundException('user not found');

    await this.cacheService.del(`phone:${dto.phone}`);

    return await this.jwtAppService.generateTokens({
      sub: user.id,
      role: 'user',
    });
  }
}
