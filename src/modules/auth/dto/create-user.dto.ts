import { GenderEnum } from '@common/enums/gender.enum';
import { IsNationalCode } from '@common/validators/is-national-code.validator';
import { NotExists } from '@common/validators/not-exists.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ example: '09928101208' })
  @IsPhoneNumber('IR')
  @NotExists(User)
  phone: string;

  @ApiProperty({ required: false, example: 'firstName-1' })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({ required: false, example: 'lastName-1' })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({ required: false, example: 'pass-1' })
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty({ example: '0927206986', required: false })
  @IsNationalCode()
  @IsOptional()
  nationalCode: string;

  @ApiProperty({ required: false, example: GenderEnum.WOMAN })
  @IsEnum(GenderEnum)
  @IsOptional()
  gender: GenderEnum;
}
