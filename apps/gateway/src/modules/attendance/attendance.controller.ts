import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { Attendance } from './models/attendance.model';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { PaginateAttendanceResponse } from './dto/paginate-attendance-response.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { PaginationOptions } from '../../common/decorators/pagination-options.decorator';

@Controller('api/v1/attendances')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @ApiOkResponse({ type: Attendance })
  async create(@Body() dto: CreateAttendanceDto) {
    return await this.attendanceService.create(dto);
  }

  @Get()
  @PaginationOptions({
    filterOptions: [
      { field: 'startTime', example: '$eq:2023-10-26' },
      { field: 'exitTime', example: '$eq:2023-10-26' },
      { field: 'personnelId', example: '$eq:1' },
    ],
    sortOptions: [
      {
        example: 'createdAt:DESC',
      },
      {
        example: 'startTime:DESC',
      },
      {
        example: 'exitTime:DESC',
      },
    ],
  })
  @ApiOkResponse({ type: PaginateAttendanceResponse })
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.attendanceService.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: Attendance })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.attendanceService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAttendanceDto,
  ) {
    return await this.attendanceService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.attendanceService.remove(id);
  }
}
