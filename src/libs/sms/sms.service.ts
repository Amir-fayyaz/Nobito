import { FARSI_PAYAMAK_URL } from '@common/constants/helpers/base-urls';
import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { OtpTemplate } from 'src/@types/otp-template.type';

@Injectable()
export class SmsService {
  constructor(
    private readonly axios: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async sendOtp(phone: string, otp: string) {
    const params: OtpTemplate = {
      api_key: this.configService.getOrThrow<string>('SMS_API_KEY'),
      number: '50002714',
      recipient: phone,
      template_id: this.configService.get<string>('OTP_TEMPLATE_ID') as string,
      username: this.configService.getOrThrow<string>('SMS_USERNAME'),
      variables: {
        code: otp,
      },
    };

    try {
      const { status } = await lastValueFrom(
        this.axios.post(`${FARSI_PAYAMAK_URL}/send-otp`, params),
      );

      if (status === 200) return { success: true };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
