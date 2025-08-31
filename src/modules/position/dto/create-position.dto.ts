import { NotExists } from '@common/validators/not-exist.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Position } from '../entities/position.entity';

export class CreatePositionDto {
  @ApiProperty({ example: 'position-title' })
  @NotExists(Position)
  name: string;

  @ApiProperty({ required: false, example: 'position-description' })
  @IsString()
  @IsOptional()
  description: string;
}
