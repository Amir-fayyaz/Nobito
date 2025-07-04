import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppointmentRabbitmq } from 'src/common/constants/rabbitmq';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { lastValueFrom } from 'rxjs';
import { AttendanceMessagePattern } from 'src/common/constants/message-patterns';
import { exeptionFilter } from 'src/common/filters/exeption-filter';
import { Attendance } from './models/attendance.model';
import { Exeption } from 'src/common/@types/exeption-type.type';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @Inject(AppointmentRabbitmq.AppointmentService_Name)
    private readonly AppointmentClient: ClientProxy,
  ) {}

  async create(dto: CreateAttendanceDto): Promise<Attendance | Exeption> {
    const createResult = await lastValueFrom(
      this.AppointmentClient.send(AttendanceMessagePattern.CREATE_ATTENDANCE, {
        ...dto,
      }),
    );

    if (createResult.status)
      exeptionFilter(createResult.status, createResult.message);

    return createResult;
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Attendance>> {
    return await lastValueFrom(
      this.AppointmentClient.send(
        AttendanceMessagePattern.FIND_ALL_ATTENDANCE,
        { query },
      ),
    );
  }

  async findOne(id: number): Promise<Attendance | Exeption> {
    const attendance = await lastValueFrom(
      this.AppointmentClient.send(
        AttendanceMessagePattern.FIND_ONE_ATTENDANCE,
        { id },
      ),
    );

    if (!attendance) exeptionFilter(404);

    return attendance;
  }

  async update(id: number, dto: UpdateAttendanceDto) {
    const updateResult = await lastValueFrom(
      this.AppointmentClient.send(AttendanceMessagePattern.UPDATE_ATTENDANCE, {
        id,
        ...dto,
      }),
    );

    if (updateResult.status)
      exeptionFilter(updateResult.status, updateResult.message);

    return {
      updatedFields: dto,
    };
  }
}
