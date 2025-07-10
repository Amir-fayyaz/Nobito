import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginateQuery } from 'nestjs-paginate';
import { TreatmentCategory } from '../entities/treatmentCategory.entity';
import { TreatmentCategoryService } from '../services/treatmentCategory.service';
import { TreatmentCategoryMessage } from 'apps/appointment/src/common/constants/message-patterns/treatment-category.messages';
import { CreateTreatmentCategory } from '../dto/create-treatmentCategory.type';
import { FindOneTreatmentCategory } from '../dto/find-one-treatmentCategory.type';
import { UpdateTreatmentCateogry } from '../dto/update-treatmentCategory.type';

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

  @MessagePattern(TreatmentCategoryMessage.FINDALL_TREATMENT_CATEGORY)
  async findAll(@Payload() query: PaginateQuery) {
    return await this.treatmentCategoryService.findAll(query);
  }

  @MessagePattern(TreatmentCategoryMessage.FIND_ONE_TREATMENT_CATEGORY)
  async findOne(@Payload() { id }: FindOneTreatmentCategory) {
    return await this.treatmentCategoryService.findOne(id);
  }

  @MessagePattern(TreatmentCategoryMessage.UPDATE_TREATMENT_CATEGORY)
  async update(@Payload() dto: UpdateTreatmentCateogry) {
    return await this.treatmentCategoryService.update(dto);
  }
}
