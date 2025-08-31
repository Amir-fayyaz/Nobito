import { NotExists } from '@common/validators/not-exist.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Position } from '../entities/position.entity';

export class UpdatePositionDto {
  @ApiProperty({ example: 'unique-name-1', required: false })
  @NotExists(Position)
  @IsOptional()
  name: string;

  @ApiProperty({ required: false, example: 'position-description' })
  @IsString()
  @IsOptional()
  description: string;
}
