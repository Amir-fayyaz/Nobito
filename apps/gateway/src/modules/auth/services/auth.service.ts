import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { RegisterByPhone } from '../dto/register-by-phone.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { RegisterByPhonePayload } from '../types/auth/registerByPhone-response.type';
import { VerifyByPhoneDto } from '../dto/verify-by-phone.dto';
import { RegisterByEmail } from '../dto/register-by-email.dto';
import { VerifyByEmail } from '../dto/verify-by-email.dto';
import { UserRabbitmq } from 'apps/gateway/src/common/constants/rabbitmq';
import { CacheService } from 'apps/gateway/src/common/services/cache.service';
import { AuthMessagePattern } from 'apps/gateway/src/common/constants/message-patterns';
import { exeptionFilter } from 'apps/gateway/src/common/filters/exeption-filter';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRabbitmq.UserService_Name)
    private readonly userClient: ClientProxy,
    private readonly cacheService: CacheService,
  ) {}

  async registerByPhone({ phone }: RegisterByPhone) {
    try {
      const cache = await this.cacheService.get(`otp:${phone}`);
      if (cache) {
        return { otp: cache };
      }

      const res: RegisterByPhonePayload = await lastValueFrom(
        this.userClient.send(AuthMessagePattern.REGISTER_BY_PHONE, { phone }),
      );

      if (res.status) exeptionFilter(res.status);

      await this.cacheService.set(`otp:${phone}`, res.otp, 120 * 1000);

      return {
        otp: res.otp,
      };
    } catch (error) {
      exeptionFilter(500, error.message);
    }
  }

  async verifyByPhone({ phone, otp }: VerifyByPhoneDto) {
    const isOtpSent = await this.cacheService.get(`otp:${phone}`);

    if (!isOtpSent) {
      exeptionFilter(400, 'Otp not found');
    }

    if (isOtpSent !== otp) exeptionFilter(400, 'Wrong otp');

    try {
      const token: string = await lastValueFrom(
        this.userClient.send(AuthMessagePattern.VERIFY_BY_PHONE, { phone }),
      );
      await this.cacheService.del(`otp:${phone}`);

      return {
        access_token: token,
      };
    } catch (e) {
      exeptionFilter(500, e.message);
    }
  }

  async registerByEmail({ email }: RegisterByEmail) {
    const cache = await this.cacheService.get(`otp:${email}`);

    if (cache) return { otp: cache };

    const res = await lastValueFrom(
      this.userClient.send(AuthMessagePattern.REGISTER_BY_EMAIL, { email }),
    );

    if (res.status) exeptionFilter(res.status);

    await this.cacheService.set(`otp:${email}`, res.otp, 120 * 1000);

    //using otp service...
    return {
      otp: res.otp,
    };
  }

  async verifyByEmail({ email, otp }: VerifyByEmail) {
    const isOtpSent = await this.cacheService.get(`otp:${email}`);

    if (!isOtpSent) throw new BadRequestException('You didnt get otp code !');

    if (isOtpSent !== otp) throw new BadRequestException('Wrong otp !');

    await this.cacheService.del(`otp:${email}`);
    return await lastValueFrom(
      this.userClient.send(AuthMessagePattern.VERIFY_BY_EMAIL, { email }),
    );
  }
}
