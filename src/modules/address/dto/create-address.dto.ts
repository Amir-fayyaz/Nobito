import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ example: 'Tehran' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'tehran' })
  @IsString()
  province: string;

  @ApiProperty({ required: false, example: 34 })
  @Min(-90)
  @Max(90)
  @IsOptional()
  latitude: number;

  @ApiProperty({ required: false, example: 114 })
  @Min(-180)
  @Max(180)
  @IsOptional()
  longitude: number;
}
