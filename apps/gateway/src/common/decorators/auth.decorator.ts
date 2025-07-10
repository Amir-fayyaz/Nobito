import { applyDecorators, UseGuards } from '@nestjs/common';
import { RoleGuard } from '../guards/role.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../../modules/auth/guards/auth.guard';

export function Auth() {
  return applyDecorators(
    ApiBearerAuth('Authorization'),
    UseGuards(AuthGuard, RoleGuard),
  );
}
