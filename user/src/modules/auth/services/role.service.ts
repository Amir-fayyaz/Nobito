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

  async create(dto: CreateRole): Promise<Role | { status: number }> {
    const role = await this.roleRepository.findOne({
      where: { name: dto.name },
    });

    // has conflict ?
    if (role) return { status: 409 };
    const newRole = this.roleRepository.create(dto);
    return await this.roleRepository.save(newRole);
  }

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOne({ where: { id } });

    if (!role) return { status: 404 };

    return role;
  }
}
