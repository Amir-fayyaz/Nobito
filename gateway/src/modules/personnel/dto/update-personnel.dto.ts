import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class UpdatePersonnelDto {
  @ApiProperty({ example: 'personnel-name 1' })
  @IsString()
  name: string;

  @ApiProperty({ example: 23_000_000 })
  @IsNumberString()
  salary_amount: number;

  @ApiProperty({ format: 'binary', required: false })
  @IsOptional()
  resume?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  positionId?: number;
}
