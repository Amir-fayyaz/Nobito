import { ApiProperty } from '@nestjs/swagger';
import { IsBooleanString, IsEnum, IsString } from 'class-validator';
import { Genders } from 'libs/enums';

export class CreatePatientDto {
  @ApiProperty({ example: 'firstname 1' })
  @IsString()
  firstname: string;

  @ApiProperty({ example: 'lastname 1' })
  @IsString()
  lastname: string;

  @ApiProperty({ example: 'job 1' })
  @IsString()
  job: string;

  @ApiProperty()
  @IsBooleanString()
  pregnant: boolean;

  @ApiProperty({ enum: Genders, enumName: 'genders', example: Genders.MAN })
  @IsEnum(Genders)
  gender: Genders;
}
