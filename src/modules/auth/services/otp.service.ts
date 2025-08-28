import { OtpType } from '@common/@types/otp-types';
import { CacheService } from '@common/services/cache.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OtpService {
  constructor(private readonly cacheService: CacheService) {}
  async sendOtp(type: OtpType, payload: string) {
    switch (type) {
      case (type = OtpType.PHONE):
        return await this.sendOtpToPhone(payload);
      case (type = OtpType.EMAIL):
        return await this.sendOtpToEmail(payload);
    }
  }

  private generateOtp(): string {
    let otp = '';
    for (let i = 0; i < 5; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    return otp;
  }

  private async sendOtpToPhone(phone: string) {
    const otp = this.generateOtp();

    await this.cacheService.set(`phone:${phone}`, otp, 120);

    //sms service for production

    return { otp };
  }
  private async sendOtpToEmail(email: string) {
    const otp = this.generateOtp();

    await this.cacheService.set(`email:${email}`, otp, 120);

    //Email service for production

    return { otp };
  }
}
