import { SetMetadata } from '@nestjs/common';
import { Roles } from '../enums/role.enum';

export const ROLE_KEY = 'roles';

export const Role = (roles: Roles[]) => {
  return SetMetadata(ROLE_KEY, roles);
};
