import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRole } from '../dto/create-role.type';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(dto: CreateRole): Promise<Role> {
    const newRole = this.roleRepository.create(dto);
    return await this.roleRepository.save(newRole);
  }
}
