import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';

export class RegisterByPhoneDto {
  @ApiProperty({ example: '09921810208' })
  @IsPhoneNumber('IR')
  phone: string;
}
