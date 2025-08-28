import { JwtAccess_Name } from '@common/constants/constant';
import { getAuthToken } from '@common/utils/get-token.util';
import { AuthService } from '@module/auth/services/auth.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}
  async use(req: Request, _: Response, next: NextFunction) {
    const token = getAuthToken(req, JwtAccess_Name) as string;

    const user = await this.authService.authenticateUser(token);
    const userRole = await this.authService.loadUserRoles(user.id);

    req.user = {
      sub: user.id,
      role: userRole ? userRole?.role.name : 'guest',
    };

    next();
  }
}
