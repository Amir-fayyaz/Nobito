import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtPayload } from 'apps/gateway/src/common/@types/jwt-payload.type';
import { UserRabbitmq } from 'apps/gateway/src/common/constants/rabbitmq';
import { Request } from 'express';
import { JwtMessage, UserMessages } from 'libs/message-patterns';
import { lastValueFrom } from 'rxjs';

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
        this.userClient.send(UserMessages.FIND_ONE, {
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
      this.userClient.send(JwtMessage.VERIFY_TOKEN, { token }),
    );

    if (validateResult.status === 401)
      throw new UnauthorizedException(validateResult.message);

    return validateResult as JwtPayload;
  }
}
