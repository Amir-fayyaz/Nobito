import { NotExists } from '@common/validators/not-exist.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';
import { User } from '../entities/user.entity';

export class RegisterByEmailDto {
  @ApiProperty()
  @NotExists(User)
  @IsEmail()
  username: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;
}
