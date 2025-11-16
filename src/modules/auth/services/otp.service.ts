import { SmsService } from '@lib/sms/sms.service';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class OtpService {
  constructor(private readonly smsService: SmsService) {}

  async sendOtp(phone: string, otp: string) {
    const result = await this.smsService.sendOtp(phone, otp);

    if (result?.success) {
      return { message: 'otp sent to your phone' };
    }

    throw new BadRequestException('Something went wrong');
  }
}
