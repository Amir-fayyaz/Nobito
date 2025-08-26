import { CacheService } from '@common/services/cache.service';
import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { Permission } from './entities/permission.entity';
import { UserPermissions } from './entities/user-permissions.entity';
import { UserRoles } from './entities/user-roles.entity';
import { User } from './entities/user.entity';
import { AuthService } from './services/auth.service';
import { JwtAppService } from './services/jwt.service';
import { OtpService } from './services/otp.service';
import { UserService } from './services/user.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRoles, Permission, UserPermissions]),
  ],
  controllers: [AuthController],
  providers: [
    UserService,
    CacheService,
    OtpService,
    AuthService,
    JwtAppService,
    JwtService,
  ],
  exports: [JwtAppService, JwtService, AuthService],
})
export class AuthModule {}
