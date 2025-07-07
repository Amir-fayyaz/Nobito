import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreatmentCategory } from './entities/treatmentCategory.entity';
import { Repository } from 'typeorm';
import { CreateTreatmentCategory } from './dto/create-treatmentCategory.type';
import { execptionError } from 'src/common/@types/eception.type';

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
}
