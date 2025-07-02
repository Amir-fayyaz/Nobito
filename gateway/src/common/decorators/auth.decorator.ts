import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

export function Auth() {
  return applyDecorators(
    ApiBearerAuth('Authorization'),
    UseGuards(AuthGuard, RoleGuard),
  );
}
