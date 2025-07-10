import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePositionDto {
  @ApiProperty({ example: 'position 1' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'position description 1' })
  @IsString()
  description: string;
}
