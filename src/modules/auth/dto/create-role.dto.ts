import { NotExists } from '@common/validators/not-exist.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Role } from '../entities/role.entity';

export class CreateRoleDto {
  @ApiProperty()
  @NotExists(Role)
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;
}
