import { NotExists } from '@common/validators/not-exist.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Permission } from '../entities/permission.entity';

export class CreatePermissionDto {
  @ApiProperty({ example: 'title for permission' })
  @NotExists(Permission)
  @IsString()
  title: string;

  @ApiProperty({ example: 'description for permission' })
  @IsString()
  @IsOptional()
  description?: string;
}
