import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponse } from 'src/common/dto/paginate-response.dto';
import { Attendance } from '../models/attendance.model';

export class PaginateAttendanceResponse extends PaginationResponse {
  @ApiProperty({ type: [Attendance] })
  data: Attendance[];
}
