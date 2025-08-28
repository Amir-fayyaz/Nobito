import { Exists } from '@common/validators/exist.validator';
import { NotExists } from '@common/validators/not-exist.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { PermissionCategory } from '../entities/permission-category.entity';
import { Permission } from '../entities/permission.entity';

export class UpdatePermissionDto {
  @ApiProperty({ example: 'updated-title', required: false })
  @NotExists(Permission)
  @IsOptional()
  title: string;

  @ApiProperty({ example: 'updated-description' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsUUID()
  @Exists(PermissionCategory)
  @IsOptional()
  categoryId: string;
}
