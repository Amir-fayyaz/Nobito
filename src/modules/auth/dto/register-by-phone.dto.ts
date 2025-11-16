import { NotExists } from '@common/validators/not-exists.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class RegisterByPhoneDto {
  @ApiProperty({ example: '09921810208' })
  @IsPhoneNumber('IR')
  @NotExists(User)
  phone: string;

  @ApiProperty({ example: 'pass-1' })
  @IsString()
  password: string;
}
