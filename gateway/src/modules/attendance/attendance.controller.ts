import { Body, Controller, Post } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { Attendance } from './models/attendance.model';

@Controller('api/v1/attendances')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @ApiOkResponse({ type: Attendance })
  async create(@Body() dto: CreateAttendanceDto) {
    return await this.attendanceService.create(dto);
  }
}
