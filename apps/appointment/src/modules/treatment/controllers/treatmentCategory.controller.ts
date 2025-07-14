import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginateQuery } from 'nestjs-paginate';
import { TreatmentCategory } from '../entities/treatmentCategory.entity';
import { TreatmentCategoryService } from '../services/treatmentCategory.service';
import { CreateTreatmentCategory } from '../dto/create-treatmentCategory.type';
import { FindOneTreatmentCategory } from '../dto/find-one-treatmentCategory.type';
import { UpdateTreatmentCateogry } from '../dto/update-treatmentCategory.type';
import { RemoveById } from 'libs/@types/public';
import { TreatmentCategoryMessage } from 'libs/message-patterns';

export class TreatmentCategoryController {
  constructor(
    @InjectRepository(TreatmentCategory)
    private readonly treatmentCategoryRepository: Repository<TreatmentCategory>,
    private readonly treatmentCategoryService: TreatmentCategoryService,
  ) {}

  @MessagePattern(TreatmentCategoryMessage.CREATE)
  async create(@Payload() dto: CreateTreatmentCategory) {
    return await this.treatmentCategoryService.create(dto);
  }

  @MessagePattern(TreatmentCategoryMessage.FINDALL)
  async findAll(@Payload() query: PaginateQuery) {
    return await this.treatmentCategoryService.findAll(query);
  }

  @MessagePattern(TreatmentCategoryMessage.FIND_ONE)
  async findOne(@Payload() { id }: FindOneTreatmentCategory) {
    return await this.treatmentCategoryService.findOne(id);
  }

  @MessagePattern(TreatmentCategoryMessage.UPDATE)
  async update(@Payload() dto: UpdateTreatmentCateogry) {
    return await this.treatmentCategoryService.update(dto);
  }
  @MessagePattern(TreatmentCategoryMessage.DELETE)
  async remove(@Payload() { id }: RemoveById) {
    return await this.treatmentCategoryService.remove(id);
  }
}
