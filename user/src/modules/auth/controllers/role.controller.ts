import { MessagePattern, Payload } from '@nestjs/microservices';
import { RoleService } from '../services/role.service';
import { RoleMessage } from 'src/common/message-patterns/role-message';
import { CreateRole } from '../dto/create-role.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';

export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  @MessagePattern(RoleMessage.CREATE_ROLE)
  async create(@Payload() dto: CreateRole) {
    return await this.roleService.create(dto);
  }
}
