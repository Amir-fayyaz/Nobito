import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from '../dto/create-permission.dto';
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
}
