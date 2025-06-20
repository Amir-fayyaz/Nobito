import { Body, Controller, Get, Post } from '@nestjs/common';
import { PositionService } from '../services/position.service';
import { CreatePositionDto } from '../dto/create-position.dto';

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
}
