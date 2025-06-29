import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponse } from 'src/common/dto/paginate-response.dto';
import { Doctor } from '../models/doctor.model';

export class PaginateDoctorResponse extends PaginationResponse {
  @ApiProperty({ type: [Doctor] })
  data: Doctor[];
}
