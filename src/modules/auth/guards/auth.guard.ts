import { JwtAccess_Name } from '@common/constants/constant';
import { IS_PUBLIC } from '@common/constants/tokens';
import { getAuthToken } from '@common/utils/get-token.util';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.isPublicEndPoint(context);

    if (isPublic) return true;

    const req = context.switchToHttp().getRequest<Request>();

    const token = getAuthToken(req, JwtAccess_Name) as string;

    const user = await this.authService.authenticateUser(token);
    const userRoles = await this.authService.loadUserRoles(user.id);

    req.user = {
      sub: user.id,
      role: userRoles ? userRoles : ['guest'],
    };

    return true;
  }

  private isPublicEndPoint(ctx: ExecutionContext) {
    const is_public = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    return !!is_public;
  }
}
