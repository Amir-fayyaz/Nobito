import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDto } from './pagination-meta.dto';
import { PaginationLinkDto } from './pagination-link.dto';

export class PaginationResponse {
  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;

  @ApiProperty({ type: PaginationLinkDto })
  links: PaginationLinkDto;
}
