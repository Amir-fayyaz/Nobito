import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRole } from '../dto/create-role.type';
import { UpdateRole } from '../dto/update-role.type';

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

  async findOne(id: number): Promise<Role | { status: number }> {
    const role = await this.roleRepository.findOne({ where: { id } });

    if (!role) return { status: 404 };

    return role;
  }

  async update(dto: UpdateRole): Promise<{ status: number }> {
    await this.findOne(dto.id);

    const hasConflict = await this.hasConflict(dto.name, Number(dto.id));

    if (hasConflict) return { status: 409 };

    await this.roleRepository.update(dto.id, {
      name: dto.name,
      description: dto.description,
    });

    return { status: 200 };
  }

  async remove(id: number) {
    return (await this.roleRepository.delete({ id })).affected === 0
      ? { status: 404 }
      : { status: 200 };
  }

  private async hasConflict(name: string, id: number): Promise<boolean> {
    const role = await this.roleRepository.findOne({ where: { name } });

    if (role && role.id != id) return true;

    return false;
  }
}
