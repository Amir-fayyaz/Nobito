import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';

export class RegisterByPhone {
  @ApiProperty({ example: '09921810208' })
  @IsPhoneNumber('IR')
  phone: string;
}
