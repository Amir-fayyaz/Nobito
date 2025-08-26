import { CacheService } from '@common/services/cache.service';
import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { PermissionCategoryController } from './controllers/permission-category.controller';
import { PermissionController } from './controllers/permission.controller';
import { RoleController } from './controllers/role.controller';
import { PermissionCategory } from './entities/permission-category.entity';
import { Permission } from './entities/permission.entity';
import { Role } from './entities/role.entity';
import { UserPermissions } from './entities/user-permissions.entity';
import { UserRoles } from './entities/user-roles.entity';
import { User } from './entities/user.entity';
import { AuthService } from './services/auth.service';
import { JwtAppService } from './services/jwt.service';
import { OtpService } from './services/otp.service';
import { PermissionCateogryService } from './services/permission-category.service';
import { PermissionService } from './services/permission.service';
import { RoleService } from './services/role.service';
import { UserService } from './services/user.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserRoles,
      Permission,
      UserPermissions,
      Role,
      PermissionCategory,
    ]),
  ],
  controllers: [
    AuthController,
    RoleController,
    PermissionController,
    PermissionCategoryController,
  ],
  providers: [
    UserService,
    CacheService,
    OtpService,
    AuthService,
    JwtAppService,
    JwtService,
    RoleService,
    PermissionService,
    PermissionCateogryService,
  ],
  exports: [JwtAppService, JwtService, AuthService],
})
export class AuthModule {}
