import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationMetaDto {
  @ApiProperty()
  itemsPerPage: number;

  @ApiProperty({ required: false })
  totalItems?: number;

  @ApiProperty({ required: false })
  currentPage?: number;

  @ApiProperty({ required: false })
  totalPages?: number;

  @ApiProperty()
  sortBy?: ['createdAt', 'DESC'];

  @ApiProperty({ required: false })
  search: string;

  @ApiPropertyOptional({ type: 'object', additionalProperties: true })
  filter?: Record<string, any>;
}
