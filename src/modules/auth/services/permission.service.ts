import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { Permission } from '../entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(dto: CreatePermissionDto): Promise<Permission> {
    const permission = this.permissionRepository.create(dto);

    return await this.permissionRepository.save(permission);
  }

  async findAll(): Promise<Permission[]> {
    return await this.permissionRepository.find({
      relations: { permissionCategory: true },
    });
  }

  async findOne(id: string): Promise<Permission | null> {
    return await this.permissionRepository.findOne({
      where: { id },
      relations: { permissionCategory: true },
    });
  }

  async update(id: string, dto: UpdatePermissionDto) {
    const { affected } = await this.permissionRepository.update(id, dto);

    if (!affected) throw new NotFoundException('permission not found');

    return { success: true };
  }

  async remove(id: string) {
    const { affected } = await this.permissionRepository.delete({ id });

    if (!affected) throw new NotFoundException();

    return { success: true };
  }
}
