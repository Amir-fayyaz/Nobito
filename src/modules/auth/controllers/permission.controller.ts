import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { PermissionService } from '../services/permission.service';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  async create(@Body() dto: CreatePermissionDto) {
    return await this.permissionService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.permissionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.permissionService.findOne(id);
  }
}
