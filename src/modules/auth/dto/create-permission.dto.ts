import { Exists } from '@common/validators/exist.validator';
import { NotExists } from '@common/validators/not-exist.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PermissionCategory } from '../entities/permission-category.entity';
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

  @ApiProperty({ example: 1 })
  @Exists(PermissionCategory)
  categoryId: string;
}
