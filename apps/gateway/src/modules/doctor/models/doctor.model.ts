import { ApiProperty } from '@nestjs/swagger';

export class Doctor {
  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  personnelId: number;
  @ApiProperty()
  doctorNumber: string;
}
