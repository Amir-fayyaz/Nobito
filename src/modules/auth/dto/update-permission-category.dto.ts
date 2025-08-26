import { NotExists } from '@common/validators/not-exist.validator';
import { ApiProperty } from '@nestjs/swagger';
import { PermissionCategory } from '../entities/permission-category.entity';

export class UpdatePermissionCategoryDto {
  @ApiProperty()
  @NotExists(PermissionCategory)
  title: string;
}
