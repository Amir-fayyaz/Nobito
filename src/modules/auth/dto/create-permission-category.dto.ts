import { NotExists } from '@common/validators/not-exist.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PermissionCategory } from '../entities/permission-category.entity';

export class CreatePermissionCategoryDto {
  @ApiProperty({ example: 'permission-category 1' })
  @NotExists(PermissionCategory)
  @IsString()
  title: string;
}
