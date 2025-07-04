import { Body, Controller, Get, Post } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { Attendance } from './models/attendance.model';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { PaginateAttendanceResponse } from './dto/paginate-attendance-response.dto';
import { PaginationOptions } from 'src/common/decorators/pagination-options.decorator';

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
}
