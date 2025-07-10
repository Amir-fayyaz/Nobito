import { ApiProperty } from '@nestjs/swagger';
import { TreatmentCategory } from '../models/treatmentCategory.model';
import { PaginationResponse } from 'apps/gateway/src/common/dto/paginate-response.dto';

export class PaginateTreatmentCategoryResponse extends PaginationResponse {
  @ApiProperty({ type: [TreatmentCategory] })
  data: TreatmentCategory;
}
