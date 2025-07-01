import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateDoctorDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  personnelId: number;
}
