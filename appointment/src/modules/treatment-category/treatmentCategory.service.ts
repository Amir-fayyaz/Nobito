import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreatmentCategory } from './entities/treatmentCategory.entity';
import { Repository } from 'typeorm';
import { CreateTreatmentCategory } from './dto/create-treatmentCategory.type';
import { execptionError } from 'src/common/@types/eception.type';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { UpdateTreatmentCateogry } from './dto/update-treatmentCategory.type';

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
      if (dto.parentId) await this.exist(dto.parentId);

      const newTreatmentCateogry = this.treatmentCategoryRepository.create(dto);
      return await this.treatmentCategoryRepository.save(newTreatmentCateogry);
    } catch (e) {
      return { message: e.message, status: 404 };
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
    return await this.treatmentCategoryRepository.findOne({
      where: { id },
      relations: ['parent'],
    });
  }

  async update(dto: UpdateTreatmentCateogry) {
    try {
      if (dto.parentId) await this.exist(dto.parentId);

      return (
        await this.treatmentCategoryRepository.update(
          { id: dto.id },
          { ...dto },
        )
      ).affected === 0
        ? { status: 404, message: 'Treatment-category not found' }
        : { id: dto.id };
    } catch (error) {
      return { message: error.message, status: 404 };
    }
  }

  async exist(id: number): Promise<void> {
    const result = await this.treatmentCategoryRepository.exists({
      where: { id },
    });

    if (!result) throw new BadRequestException('invalid parentId');
  }
}
