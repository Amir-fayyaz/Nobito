import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  firstname: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  nationalCode: string;
  @ApiProperty()
  avatar: string;
  @ApiProperty()
  fathername: string;
  @ApiProperty()
  isVerified: boolean;
  @ApiProperty()
  roleId: number;
}
