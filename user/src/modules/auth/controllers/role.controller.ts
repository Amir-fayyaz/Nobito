import { MessagePattern, Payload } from '@nestjs/microservices';
import { RoleService } from '../services/role.service';
import { RoleMessage } from 'src/common/message-patterns/role-message';
import { CreateRole } from '../dto/create-role.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';
import { FindRoleById } from '../dto/fine-one-by-id.type';

export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  @MessagePattern(RoleMessage.CREATE_ROLE)
  async create(@Payload() dto: CreateRole) {
    return await this.roleService.create(dto);
  }

  @MessagePattern(RoleMessage.GET_ALL_ROLES)
  async findAll() {
    return await this.roleService.findAll();
  }

  @MessagePattern(RoleMessage.FIND_ROLE_BY_ID)
  async findOne(@Payload() { id }: FindRoleById) {
    return await this.roleService.findOne(id);
  }
}
