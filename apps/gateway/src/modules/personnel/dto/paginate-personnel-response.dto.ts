import { ApiProperty } from '@nestjs/swagger';
import { Personnel } from '../models/personnel.model';
import { PaginationResponse } from 'apps/gateway/src/common/dto/paginate-response.dto';

export class PaginatePersonnelResponse extends PaginationResponse {
  @ApiProperty({ type: [Personnel] })
  data: Personnel[];
}
