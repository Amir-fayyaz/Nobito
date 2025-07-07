import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreatmentCategory } from './entities/treatmentCategory.entity';
import { Repository } from 'typeorm';
import { CreateTreatmentCategory } from './dto/create-treatmentCategory.type';

@Injectable()
export class TreatmentCategoryService {
  constructor(
    @InjectRepository(TreatmentCategory)
    private readonly treatmentCategoryRepository: Repository<TreatmentCategory>,
  ) {}

  async create(dto: CreateTreatmentCategory): Promise<TreatmentCategory> {
    const newTreatmentCateogry = this.treatmentCategoryRepository.create(dto);
    return await this.treatmentCategoryRepository.save(newTreatmentCateogry);
  }
}
