import { InjectRepository } from '@nestjs/typeorm';
import { TreatmentCategoryService } from './treatmentCategory.service';
import { TreatmentCategory } from './entities/treatmentCategory.entity';
import { Repository } from 'typeorm';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TreatmentCategoryMessage } from 'src/common/constants/message-patterns/treatment-category.messages';
import { CreateTreatmentCategory } from './dto/create-treatmentCategory.type';

export class TreatmentCategoryController {
  constructor(
    @InjectRepository(TreatmentCategory)
    private readonly treatmentCategoryRepository: Repository<TreatmentCategory>,
    private readonly treatmentCategoryService: TreatmentCategoryService,
  ) {}

  @MessagePattern(TreatmentCategoryMessage.CREATE_TREATMENT_CATEGORY)
  async create(@Payload() dto: CreateTreatmentCategory) {
    return await this.treatmentCategoryService.create(dto);
  }
}
