import { CacheService } from '@common/services/cache.service';
import { SmsModule } from '@lib/sms/sms.module';
import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { AuthService } from './services/auth.service';
import { JwtAppService } from './services/jwt.service';
import { OtpService } from './services/otp.service';
import { UserService } from './services/user.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User]), SmsModule],
  controllers: [UserController, AuthController],
  providers: [
    UserService,
    JwtAppService,
    JwtService,
    AuthService,
    CacheService,
    OtpService,
  ],
  exports: [JwtAppService, JwtService],
})
export class AuthModule {}
