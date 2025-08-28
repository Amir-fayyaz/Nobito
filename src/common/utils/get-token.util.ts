import { UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

export function getAuthToken(request: Request, cookieName: string): string {
  const accessToken = request.cookies?.[cookieName];

  if (!accessToken) throw new UnauthorizedException('token not provided');

  return accessToken;
}
