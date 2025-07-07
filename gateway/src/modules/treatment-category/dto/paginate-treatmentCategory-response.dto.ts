import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponse } from 'src/common/dto/paginate-response.dto';
import { TreatmentCategory } from '../models/treatmentCategory.model';

export class PaginateTreatmentCategoryResponse extends PaginationResponse {
  @ApiProperty({ type: [TreatmentCategory] })
  data: TreatmentCategory;
}
