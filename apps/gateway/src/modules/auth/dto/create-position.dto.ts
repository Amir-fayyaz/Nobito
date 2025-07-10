import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePositionDto {
  @ApiProperty({ example: 'position 1' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'description about position 1' })
  @IsString()
  description: string;
}
