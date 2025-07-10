import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'name 1' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'description 1' })
  @IsString()
  description: string;
}
