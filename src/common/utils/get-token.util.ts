import { Request } from 'express';

export function getAuthToken(
  request: Request,
  cookieName: string,
): string | null {
  return request.cookies.name[cookieName];
}
