import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '../decorators/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const userRole: string = context.switchToHttp().getRequest().user.role;
    const requiredRoles: string[] = this.reflector.get(
      ROLE_KEY,
      context.getHandler(),
    );

    return requiredRoles.includes(userRole);
  }
}
