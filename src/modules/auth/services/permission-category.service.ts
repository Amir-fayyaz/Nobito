import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionCategoryDto } from '../dto/create-permission-category.dto';
import { UpdatePermissionCategoryDto } from '../dto/update-permission-category.dto';
import { PermissionCategory } from '../entities/permission-category.entity';

@Injectable()
export class PermissionCateogryService {
  constructor(
    @InjectRepository(PermissionCategory)
    private readonly categoryRepository: Repository<PermissionCategory>,
  ) {}

  async create(dto: CreatePermissionCategoryDto): Promise<PermissionCategory> {
    const category = this.categoryRepository.create(dto);

    return await this.categoryRepository.save(category);
  }

  async findAll(): Promise<PermissionCategory[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: string): Promise<PermissionCategory | null> {
    return await this.categoryRepository.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdatePermissionCategoryDto) {
    const { affected } = await this.categoryRepository.update(id, dto);

    if (!affected) throw new NotFoundException('permission-category not found');

    return { success: true };
  }
}
