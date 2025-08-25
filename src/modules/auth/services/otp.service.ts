import { CacheService } from '@common/services/cache.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OtpService {
  constructor(private readonly cacheService: CacheService) {}
  async sendOtp(phone: string) {
    const otp = this.generateOtp();

    await this.cacheService.set(`phone:${phone}`, otp, 120);

    //sms service for production

    return { otp };
  }

  private generateOtp(): string {
    let otp = '';
    for (let i = 0; i < 5; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    return otp;
  }
}
