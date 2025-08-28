import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class RegisterByEmailDto {
  @ApiProperty()
  @IsEmail()
  username: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;
}
