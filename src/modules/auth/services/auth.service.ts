import { CacheService } from '@common/services/cache.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterByPhoneDto } from '../dto/register-by-phone.dto';
import { User } from '../entities/user.entity';
import { OtpService } from './otp.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly cacheService: CacheService,
    private readonly otpService: OtpService,
  ) {}

  async registerByPhone(dto: RegisterByPhoneDto) {
    const user = await this.userRepo.findOneBy({ phone: dto.phone });

    if (user) {
      if (user.password !== dto.password) {
        throw new BadRequestException('Wrong[-password');
      }

      const otp = generateOtp();
      await this.cacheService.set(`${dto.phone}-otp`, otp, 120); //2 minute
      return await this.otpService.sendOtp(user.phone, otp);
    } else {
      const newUser = this.userRepo.create({
        phone: dto.phone,
        password: dto.password,
      });

      await this.userRepo.save(newUser);

      const otp = generateOtp();
      await this.cacheService.set(`${dto.phone}-otp`, otp, 120); //2 minute
      return await this.otpService.sendOtp(dto.phone, otp);
    }
  }
}
