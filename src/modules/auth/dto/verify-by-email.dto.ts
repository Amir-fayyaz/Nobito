import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class VerifyByEmailDto {
  @ApiProperty({ example: 'example@gmail.com' })
  @IsEmail()
  username: string;

  @ApiProperty({ example: '93842' })
  @Length(5, 5)
  otp: string;
}
