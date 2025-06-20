import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { OtpService } from './services/otp.service';
import { JwtAppService } from './services/jwt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { RoleController } from './controllers/role.controller';
import { RoleService } from './services/role.service';
import { Role } from './entities/role.entity';
import { PositionController } from './controllers/position.controller';
import { PositionService } from './services/position.service';
import { Position } from './entities/position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Position])],
  controllers: [AuthController, RoleController, PositionController],
  providers: [
    AuthService,
    OtpService,
    JwtAppService,
    JwtService,
    UserService,
    RoleService,
    PositionService,
  ],
  exports: [JwtService],
})
export class AuthModule {}
