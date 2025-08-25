import { ApiProperty } from '@nestjs/swagger';

export class RegisterByPhoneResponse {
  @ApiProperty({ example: '28421' })
  otp: string;
}
