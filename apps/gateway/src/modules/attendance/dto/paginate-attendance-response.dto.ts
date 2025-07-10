import { ApiProperty } from '@nestjs/swagger';
import { Attendance } from '../models/attendance.model';
import { PaginationResponse } from 'apps/gateway/src/common/dto/paginate-response.dto';

export class PaginateAttendanceResponse extends PaginationResponse {
  @ApiProperty({ type: [Attendance] })
  data: Attendance[];
}
