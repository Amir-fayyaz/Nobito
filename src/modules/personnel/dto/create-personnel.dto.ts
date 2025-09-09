import { Exists } from '@common/validators/exist.validator';
import { NotExists } from '@common/validators/not-exist.validator';
import { User } from '@module/auth/entities/user.entity';
import { Position } from '@module/position/entities/position.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { Personnel } from '../entities/personnel.entity';

export class CreatePersonnelDto {
  @ApiProperty({ example: 'Amir-Fayyaz' })
  @IsString()
  fullName: string;

  @ApiProperty({ format: 'binary', required: false })
  @IsOptional()
  resume: string;

  @ApiProperty({ example: 14_000_000 })
  @IsNumberString()
  salary: number;

  @ApiProperty({ example: '9aec44dd-ca44-4350-b139-69591f048c2c' })
  @Exists(Position)
  positionId: string;

  @ApiProperty({ example: '91a6487a-9d1c-4e9e-bb07-0b3a254c2e8b' })
  @Exists(User)
  @NotExists(Personnel, 'userId')
  userId: string;
}
