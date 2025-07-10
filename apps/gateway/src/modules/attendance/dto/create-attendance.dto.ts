import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt } from 'class-validator';

export class CreateAttendanceDto {
  @ApiProperty({})
  @IsDateString()
  startTime: Date;

  @ApiProperty({})
  @IsDateString()
  exitTime: Date;

  @ApiProperty()
  @IsInt()
  personnelId: number;
}
