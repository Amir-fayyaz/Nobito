import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponse } from 'src/common/dto/paginate-response.dto';
import { Personnel } from '../models/personnel.model';

export class PaginatePersonnelResponse extends PaginationResponse {
  @ApiProperty({ type: [Personnel] })
  data: Personnel[];
}
