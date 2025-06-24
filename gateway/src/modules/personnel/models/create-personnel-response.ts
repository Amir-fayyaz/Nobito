import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonnelResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  name: string;
  @ApiProperty()
  personnelNumber: string;
  @ApiProperty()
  salary_amount: number;
  @ApiProperty()
  positionId: number;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  resume: string;
}
