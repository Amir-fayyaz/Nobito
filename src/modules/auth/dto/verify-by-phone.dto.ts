import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString } from 'class-validator';

export class VerifyByPhoneDto {
  @ApiProperty({ example: '09921810208' })
  @IsPhoneNumber('IR')
  phone: string;

  @ApiProperty({ example: '28429' })
  @IsString()
  otp: string;
}
