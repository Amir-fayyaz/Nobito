import { Body, Controller, Post } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { CreateRoleDto } from '../dto/create-role.dto';

@Controller('api/v1/roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() dto: CreateRoleDto) {
    return await this.roleService.create(dto);
  }
}
