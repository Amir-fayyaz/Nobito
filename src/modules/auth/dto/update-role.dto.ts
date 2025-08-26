import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty()
  @IsString()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;
}
