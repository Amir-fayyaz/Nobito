import { Injectable } from '@nestjs/common';
import { hash } from 'src/common/utility/hash';

@Injectable()
export class OtpService {
  constructor() {}

  private generateOtp(): string {
    return String(Math.floor(10000 + Math.random() * 90000));
  }

  async generateAndSend() {
    const otp = this.generateOtp();

    return {
      otp,
      hashedOtp: await hash(otp),
    };
  }
}
