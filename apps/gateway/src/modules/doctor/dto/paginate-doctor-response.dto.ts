import { ApiProperty } from '@nestjs/swagger';
import { Doctor } from '../models/doctor.model';
import { PaginationResponse } from 'apps/gateway/src/common/dto/paginate-response.dto';

export class PaginateDoctorResponse extends PaginationResponse {
  @ApiProperty({ type: [Doctor] })
  data: Doctor[];
}
