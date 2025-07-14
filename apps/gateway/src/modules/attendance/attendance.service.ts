import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { lastValueFrom } from 'rxjs';
import { Attendance } from './models/attendance.model';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { AppointmentRabbitmq } from '../../common/constants/rabbitmq';
import { exeptionFilter } from '../../common/filters/exeption-filter';
import { Exeption } from '../../common/@types/exeption-type.type';
import { AttendanceMessage } from 'libs/message-patterns';

@Injectable()
export class AttendanceService {
  constructor(
    @Inject(AppointmentRabbitmq.AppointmentService_Name)
    private readonly AppointmentClient: ClientProxy,
  ) {}

  async create(dto: CreateAttendanceDto): Promise<Attendance | Exeption> {
    const createResult = await lastValueFrom(
      this.AppointmentClient.send(AttendanceMessage.CREATE, {
        ...dto,
      }),
    );

    if (createResult.status)
      exeptionFilter(createResult.status, createResult.message);

    return createResult;
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Attendance>> {
    return await lastValueFrom(
      this.AppointmentClient.send(AttendanceMessage.FIND_ALL, { query }),
    );
  }

  async findOne(id: number): Promise<Attendance | Exeption> {
    const attendance = await lastValueFrom(
      this.AppointmentClient.send(AttendanceMessage.FIND_ONE, { id }),
    );

    if (!attendance) exeptionFilter(404);

    return attendance;
  }

  async update(id: number, dto: UpdateAttendanceDto) {
    const updateResult = await lastValueFrom(
      this.AppointmentClient.send(AttendanceMessage.UPDATE, {
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

  async remove(id: number): Promise<number> {
    const removeResult: number = await lastValueFrom(
      this.AppointmentClient.send(AttendanceMessage.DELETE, {
        id,
      }),
    );

    if (!removeResult) exeptionFilter(404);

    return id;
  }
}
