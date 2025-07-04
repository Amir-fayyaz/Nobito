import { ApiProperty } from '@nestjs/swagger';

export class Attendance {
  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  startTime: Date;
  @ApiProperty()
  existTime: Date;
  @ApiProperty()
  personnelId: number;
}
