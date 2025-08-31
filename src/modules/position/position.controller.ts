import { Public } from '@common/decorators/is-public.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { PositionService } from './position.service';

@Controller('positions')
@Public()
export class PositionController {
  constructor(private readonly service: PositionService) {}

  @Post()
  async create(@Body() dto: CreatePositionDto) {
    return await this.service.create(dto);
  }
}
