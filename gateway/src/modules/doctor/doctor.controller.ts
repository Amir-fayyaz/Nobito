import { Body, Controller, Get, Post } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { PaginationOptions } from 'src/common/decorators/pagination-options.decorator';
import { ApiOkResponse } from '@nestjs/swagger';
import { PaginateDoctorResponse } from './dto/paginate-doctor-response.dto';

@Controller('api/v1/doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  async create(@Body() dto: CreateDoctorDto) {
    return await this.doctorService.create(dto);
  }

  @Get()
  @PaginationOptions({
    sortOptions: [{ example: 'createdAt:DESC' }, { example: 'updatedAt:DESC' }],
  })
  @ApiOkResponse({ type: PaginateDoctorResponse })
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.doctorService.findAll(query);
  }
}
