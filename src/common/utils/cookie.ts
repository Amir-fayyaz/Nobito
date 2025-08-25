import { CookieOptions } from '@common/@types/cookie-options';
import { Response } from 'express';

export function setCookies(res: Response, cookies: CookieOptions[]): void {
  cookies.forEach((cookie) => {
    res.cookie(cookie.name, cookie.value, cookie.options || {});
  });
}

export function clearCookies(res: Response, cookies: string[]) {
  cookies.forEach((cookieName) => {
    res.clearCookie(cookieName, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });
  });
}
