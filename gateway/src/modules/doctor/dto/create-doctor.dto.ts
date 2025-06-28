import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty({ example: 2 })
  @IsInt()
  personnelId: number;
}
