import { SetMetadata } from '@nestjs/common';

export const PUBLIC_KEY = 'public_key';

export const IsPublic = () => {
  return SetMetadata(PUBLIC_KEY, true);
};
