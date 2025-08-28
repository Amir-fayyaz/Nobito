import { OtpType } from '@common/@types/otp-types';
import { CacheService } from '@common/services/cache.service';
import { Compare } from '@common/utils/hash';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginByEmailDto } from '../dto/login-by-email.dto';
import { RegisterByEmailDto } from '../dto/register-by-email.dto';
import { RegisterByPhoneDto } from '../dto/register-by-phone.dto';
import { VerifyByEmailDto } from '../dto/verify-by-email.dto';
import { VerifyByPhoneDto } from '../dto/verify-by-phone.dto';
import { User } from '../entities/user.entity';
import { JwtAppService } from './jwt.service';
import { OtpService } from './otp.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly cacheService: CacheService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly otpService: OtpService,
    private readonly jwtAppService: JwtAppService,
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

      return await this.otpService.sendOtp(OtpType.PHONE, phone);
    } else {
      return await this.otpService.sendOtp(OtpType.PHONE, phone);
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

    if (!user.isPhoneVerified) user.isPhoneVerified = true;

    await this.userRepository.save(user);

    return await this.jwtAppService.generateTokens({
      sub: user.id,
    });
  }

  async registerByEmail({ password, username }: RegisterByEmailDto) {
    const user = await this.userRepository.findOne({ where: { username } });

    const isOtpSent = await this.cacheService.get(`email:${username}`);

    if (isOtpSent)
      throw new HttpException('otp sent !', HttpStatus.TOO_MANY_REQUESTS);

    if (!user) {
      const newUser = this.userRepository.create({ username, password });
      await this.userRepository.save(newUser);

      return await this.otpService.sendOtp(OtpType.EMAIL, username);
    } else {
      if (user.isPhoneVerified)
        throw new BadRequestException('Login into your acount');

      return await this.otpService.sendOtp(OtpType.EMAIL, username);
    }
  }

  async verifyByEmail(dto: VerifyByEmailDto) {
    const user = await this.userRepository.findOne({
      where: { username: dto.username },
    });

    if (!user) throw new NotFoundException('user not found');
    if (user && user.isEmailVerified)
      throw new BadRequestException('Your Acount was verified');

    const otp = await this.cacheService.get(`email:${dto.username}`);

    if (!otp) throw new NotFoundException('You didnt get otp yet !');

    if (otp && otp !== dto.otp) throw new BadRequestException('Wrong otp !');

    user.isEmailVerified = true;
    await this.userRepository.save(user);

    await this.cacheService.del(`email:${dto.username}`);

    return await this.jwtAppService.generateTokens({ sub: user.id });
  }

  async login({ password, username }: LoginByEmailDto) {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) throw new NotFoundException();
    if (!user.isEmailVerified)
      throw new BadRequestException('Your email didnt verified');

    const isPasswordCorrect = Compare(password, user.password);

    if (!isPasswordCorrect) throw new BadRequestException('Wrong password !');

    return await this.jwtAppService.generateTokens({
      sub: user.id,
    });
  }
}
