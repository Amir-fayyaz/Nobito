import { MessagePattern, Payload } from '@nestjs/microservices';
import { RoleService } from '../services/role.service';
import { RoleMessage } from 'src/common/message-patterns/role-message';
import { CreateRole } from '../dto/create-role.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';
import { FindRoleById } from '../dto/fine-one-by-id.type';
import { UpdateRole } from '../dto/update-role.type';
import { RemoveRole } from '../dto/remove-role.type';

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

  @MessagePattern(RoleMessage.UPDATE_ROLE)
  async update(@Payload() dto: UpdateRole) {
    return await this.roleService.update(dto);
  }

  @MessagePattern(RoleMessage.DELETE_ROLE)
  async remove(@Payload() { id }: RemoveRole) {
    return await this.roleService.remove(id);
  }
}
