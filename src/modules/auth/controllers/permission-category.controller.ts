import { Body, Controller, Post } from '@nestjs/common';
import { CreatePermissionCategoryDto } from '../dto/create-permission-category.dto';
import { PermissionCateogryService } from '../services/permission-category.service';

@Controller('permission-category')
export class PermissionCategoryController {
  constructor(private readonly service: PermissionCateogryService) {}

  @Post()
  async create(@Body() dto: CreatePermissionCategoryDto) {
    return await this.service.create(dto);
  }
}
