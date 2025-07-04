import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppointmentRabbitmq } from 'src/common/constants/rabbitmq';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { lastValueFrom } from 'rxjs';
import { AttendanceMessagePattern } from 'src/common/constants/message-patterns';
import { exeptionFilter } from 'src/common/filters/exeption-filter';
import { Attendance } from './models/attendance.model';

@Injectable()
export class AttendanceService {
  constructor(
    @Inject(AppointmentRabbitmq.AppointmentService_Name)
    private readonly AppointmentClient: ClientProxy,
  ) {}

  async create(dto: CreateAttendanceDto): Promise<Attendance> {
    const createResult = await lastValueFrom(
      this.AppointmentClient.send(AttendanceMessagePattern.CREATE_ATTENDANCE, {
        ...dto,
      }),
    );

    if (createResult.status)
      exeptionFilter(createResult.status, createResult.message);

    return createResult;
  }
}
