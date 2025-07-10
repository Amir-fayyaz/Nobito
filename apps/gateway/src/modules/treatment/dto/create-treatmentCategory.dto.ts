import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTreatmentCategoryDto {
  @ApiProperty({ example: 'treatment-category 1' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'treatment-cateogry description 1' })
  @IsString()
  description: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  parentId: number;
}
