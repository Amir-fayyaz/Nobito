import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePermissionCategoryDto } from '../dto/create-permission-category.dto';
import { UpdatePermissionCategoryDto } from '../dto/update-permission-category.dto';
import { PermissionCateogryService } from '../services/permission-category.service';

@Controller('permission-category')
export class PermissionCategoryController {
  constructor(private readonly service: PermissionCateogryService) {}

  @Post()
  async create(@Body() dto: CreatePermissionCategoryDto) {
    return await this.service.create(dto);
  }

  @Get()
  async findAll() {
    return await this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePermissionCategoryDto,
  ) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.remove(id);
  }
}
