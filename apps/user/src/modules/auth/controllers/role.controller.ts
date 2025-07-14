import { MessagePattern, Payload } from '@nestjs/microservices';
import { RoleService } from '../services/role.service';
import { CreateRole } from '../dto/create-role.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';
import { FindById } from '../dto/fine-one-by-id.type';
import { UpdateRole } from '../dto/update-role.type';
import { RemoveRole } from '../dto/remove-role.type';
import { RoleMessage } from 'libs/message-patterns';

export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  @MessagePattern(RoleMessage.CREATE)
  async create(@Payload() dto: CreateRole) {
    return await this.roleService.create(dto);
  }

  @MessagePattern(RoleMessage.FIND_ALL)
  async findAll() {
    return await this.roleService.findAll();
  }

  @MessagePattern(RoleMessage.FIND_ONE)
  async findOne(@Payload() { id }: FindById) {
    return await this.roleService.findOne(id);
  }

  @MessagePattern(RoleMessage.UPDATE)
  async update(@Payload() dto: UpdateRole) {
    return await this.roleService.update(dto);
  }

  @MessagePattern(RoleMessage.DELETE)
  async remove(@Payload() { id }: RemoveRole) {
    return await this.roleService.remove(id);
  }
}
