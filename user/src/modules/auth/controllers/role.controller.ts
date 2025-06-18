import { MessagePattern, Payload } from '@nestjs/microservices';
import { RoleService } from '../services/role.service';
import { RoleMessage } from 'src/common/message-patterns/role-message';
import { CreateRole } from '../dto/create-role.type';

export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @MessagePattern(RoleMessage.CREATE_ROLE)
  async create(@Payload() dto: CreateRole) {
    return await this.roleService.create(dto);
  }
}
