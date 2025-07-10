import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export class CreatePersonnelDto {
  @ApiProperty({ example: 'personnel 1' })
  @IsString()
  name: string;

  @ApiProperty({ example: 23_000_000 })
  @IsNumberString()
  salary_amount: number;

  @ApiProperty({ example: 1 })
  @IsNumberString()
  userId: number;

  @ApiProperty({ example: 3 })
  @IsNumberString()
  positionId: number;

  @ApiProperty({ format: 'binary' })
  resume: string;
}
