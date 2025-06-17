import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterByPhone } from '../dto/register-by-phone.dto';
import { UserRabbitmq } from 'src/common/constants/rabbitmq';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { AuthMessagePattern } from 'src/common/constants/message-patterns';
import { RegisterByPhonePayload } from '../types/auth/registerByPhone-response.type';
// import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheService } from 'src/common/services/cache.service';

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

      if (res.status === 409)
        throw new ConflictException('user already exist!');

      await this.cacheService.set(`otp:${phone}`, res.otp, 120 * 1000);

      return {
        otp: res.otp,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
