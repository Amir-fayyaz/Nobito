import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionCategoryDto } from '../dto/create-permission-category.dto';
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
}
