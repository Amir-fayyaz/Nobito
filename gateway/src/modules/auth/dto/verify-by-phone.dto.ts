import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString, MaxLength } from 'class-validator';

export class VerifyByPhoneDto {
  @ApiProperty({ maximum: 5 })
  @IsString()
  @MaxLength(5)
  otp: string;

  @ApiProperty({ example: '09921810208' })
  @IsPhoneNumber('IR')
  phone: string;
}
