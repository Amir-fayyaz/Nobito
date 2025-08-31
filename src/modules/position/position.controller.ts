import { Public } from '@common/decorators/is-public.decorator';
import { AtLeastOnePipe } from '@common/pipes/at-least-one.pipe';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PositionService } from './position.service';

@Controller('positions')
@Public()
export class PositionController {
  constructor(private readonly service: PositionService) {}

  @Post()
  async create(@Body() dto: CreatePositionDto) {
    return await this.service.create(dto);
  }

  @Get()
  async findAll() {
    return await this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new AtLeastOnePipe(['name', 'description'])) dto: UpdatePositionDto,
  ) {
    return await this.service.update(id, dto);
  }
}
