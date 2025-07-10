import { ApiProperty } from '@nestjs/swagger';
import { User } from '../models/user.model';
import { PaginationResponse } from 'apps/gateway/src/common/dto/paginate-response.dto';

export class PaginatedUserResponse extends PaginationResponse {
  @ApiProperty({ type: [User] })
  data: User[];
}
