import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class VerifyByEmail {
  @ApiProperty({ example: 'amir@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '63056' })
  @IsString({})
  @Length(5)
  otp: string;
}
