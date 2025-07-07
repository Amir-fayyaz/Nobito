import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreatmentCategory } from './entities/treatmentCategory.entity';
import { Repository } from 'typeorm';
import { CreateTreatmentCategory } from './dto/create-treatmentCategory.type';
import { execptionError } from 'src/common/@types/eception.type';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class TreatmentCategoryService {
  constructor(
    @InjectRepository(TreatmentCategory)
    private readonly treatmentCategoryRepository: Repository<TreatmentCategory>,
  ) {}

  async create(
    dto: CreateTreatmentCategory,
  ): Promise<TreatmentCategory | execptionError> {
    try {
      const newTreatmentCateogry = this.treatmentCategoryRepository.create(dto);
      return await this.treatmentCategoryRepository.save(newTreatmentCateogry);
    } catch (e) {
      return { message: e.message, status: 400 };
    }
  }

  async findAll(query: PaginateQuery): Promise<Paginated<TreatmentCategory>> {
    return await paginate(query, this.treatmentCategoryRepository, {
      sortableColumns: ['createdAt'],
      defaultSortBy: [['createdAt', 'DESC']],
      select: [
        'id',
        'createdAt',
        'updatedAt',
        'title',
        'description',
        'parentId',
        'parent',
        'parent.title',
        'parent.description',
      ],
      relations: ['parent'],
    });
  }

  async findOne(id: number): Promise<TreatmentCategory | null> {
    return await this.treatmentCategoryRepository.findOne({ where: { id } });
  }
}
