import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { lastValueFrom } from 'rxjs';
import { JwtPayload } from 'src/common/@types/jwt-payload.type';
import {
  JwtMessagePattern,
  UserMessagePattern,
} from 'src/common/constants/message-patterns';
import { UserRabbitmq } from 'src/common/constants/rabbitmq';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(UserRabbitmq.UserService_Name)
    private readonly userClient: ClientProxy,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const token = this.extractToken(context);
      const payload = await this.validateToken(token);

      const user = await lastValueFrom(
        this.userClient.send(UserMessagePattern.GET_USER_BY_ID, {
          id: payload.sub,
        }),
      );

      if (!user) throw new UnauthorizedException('Invalid user');

      context.switchToHttp().getRequest().user = {
        sub: user.id,
        role: user.role || 'user',
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  private extractToken(ctx: ExecutionContext): string {
    const token = ctx
      .switchToHttp()
      .getRequest<Request>()
      .headers.authorization?.split(' ')[1];

    if (!token) throw new UnauthorizedException('token not provided');

    return token;
  }

  private async validateToken(token: string): Promise<JwtPayload> {
    const validateResult = await lastValueFrom(
      this.userClient.send(JwtMessagePattern.VERIFY_TOKEN, { token }),
    );

    if (validateResult.status === 401)
      throw new UnauthorizedException(validateResult.message);

    return validateResult as JwtPayload;
  }
}
