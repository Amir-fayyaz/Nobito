import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginByEmailDto {
  @ApiProperty({ example: 'amir@gmail.com' })
  @IsEmail()
  username: string;

  @ApiProperty({ example: 'Strong&3Password' })
  @IsStrongPassword()
  password: string;
}
