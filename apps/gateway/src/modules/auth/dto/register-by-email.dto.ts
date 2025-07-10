import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RegisterByEmail {
  @ApiProperty({ example: 'amir@gmail.com' })
  @IsEmail()
  email: string;
}
