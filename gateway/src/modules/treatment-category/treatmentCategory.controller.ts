import { Body, Controller, Post } from '@nestjs/common';
import { TreatmentCategoryService } from './treatmentCategory.service';
import { CreateTreatmentCategoryDto } from './dto/create-treatmentCategory.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { TreatmentCategory } from './models/treatmentCategory.model';

@Controller('api/v1/treatment-category')
export class TreatmentCategoryController {
  constructor(
    private readonly treatmentCategoryService: TreatmentCategoryService,
  ) {}

  @Post()
  @ApiOkResponse({ type: TreatmentCategory })
  async create(@Body() dto: CreateTreatmentCategoryDto) {
    return await this.treatmentCategoryService.create(dto);
  }
}
