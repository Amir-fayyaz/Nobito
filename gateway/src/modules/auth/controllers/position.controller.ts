import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PositionService } from '../services/position.service';
import { CreatePositionDto } from '../dto/create-position.dto';
import { UpdatePositionDto } from '../dto/update-position.dto';

@Controller('api/v1/positions')
export class PositionController {
  constructor(private readonly PositionService: PositionService) {}

  @Post()
  async create(@Body() dto: CreatePositionDto) {
    return await this.PositionService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.PositionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.PositionService.findOne(id);
  }

  @Put(':id')
  async update(
    @Body() dto: UpdatePositionDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.PositionService.update(dto, id);
  }
}
