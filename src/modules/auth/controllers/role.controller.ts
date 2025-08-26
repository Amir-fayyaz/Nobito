import { Body, Controller, Post } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { RoleService } from '../services/role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() dto: CreateRoleDto) {
    return await this.roleService.create(dto);
  }
}
