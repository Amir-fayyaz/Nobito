import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TreatmentCategoryService } from './treatmentCategory.service';
import { CreateTreatmentCategoryDto } from './dto/create-treatmentCategory.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { TreatmentCategory } from './models/treatmentCategory.model';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { PaginateTreatmentCategoryResponse } from './dto/paginate-treatmentCategory-response.dto';
import { PaginationOptions } from 'src/common/decorators/pagination-options.decorator';

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

  @Get()
  @PaginationOptions({
    sortOptions: [{ example: 'createdAt:ASC' }],
  })
  @ApiOkResponse({ type: PaginateTreatmentCategoryResponse })
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.treatmentCategoryService.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: TreatmentCategory })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.treatmentCategoryService.findOne(id);
  }
}
