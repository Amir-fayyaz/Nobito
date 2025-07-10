import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { TreatmentCategoryService } from '../service/treatmentCategory.service';
import { TreatmentCategory } from '../models/treatmentCategory.model';
import { CreateTreatmentCategoryDto } from '../dto/create-treatmentCategory.dto';
import { PaginationOptions } from 'apps/gateway/src/common/decorators/pagination-options.decorator';
import { PaginateTreatmentCategoryResponse } from '../dto/paginate-treatmentCategory-response.dto';
import { UpdateTreatmentCategoryDto } from '../dto/update-treatmentCategory.dto';

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

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTreatmentCategoryDto,
  ) {
    return await this.treatmentCategoryService.update(id, dto);
  }
}
