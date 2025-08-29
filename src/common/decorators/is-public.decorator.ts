import { IS_PUBLIC } from '@common/constants/tokens';
import { SetMetadata } from '@nestjs/common';

export const Public = () => {
  return SetMetadata(IS_PUBLIC, true);
};
