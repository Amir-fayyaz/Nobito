import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Repository } from 'typeorm';
import { CreateAttendance } from './dto/create-attendance.type';
import { PersonnelMessage } from 'src/common/constants/message-patterns/personnel.messages';
import { lastValueFrom } from 'rxjs';
import { RabbitmqEnviroments } from 'src/common/constants/rabbitmq';
import { ClientProxy } from '@nestjs/microservices';
import { execptionError } from 'src/common/@types/eception.type';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRespository: Repository<Attendance>,
    @Inject(RabbitmqEnviroments.UserService_Name)
    private readonly userClient: ClientProxy,
  ) {}

  async create(dto: CreateAttendance): Promise<Attendance | execptionError> {
    try {
      await this.isPersonnelExist(dto.personnelId);
    } catch (error) {
      return { status: 404, message: error.message };
    }

    try {
      const newAttendance = this.attendanceRespository.create(dto);
      return await this.attendanceRespository.save(newAttendance);
    } catch (e) {
      return { status: 400, message: e.message };
    }
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Attendance>> {
    return await paginate(query, this.attendanceRespository, {
      sortableColumns: ['createdAt', 'startTime', 'exitTime'],
      defaultSortBy: [['createdAt', 'DESC']],
      select: [
        'id',
        'createdAt',
        'updatedAt',
        'startTime',
        'exitTime',
        'personnelId',
      ],

      filterableColumns: {
        startTime: [FilterOperator.EQ, FilterOperator.GT, FilterOperator.LT],
        exitTime: [FilterOperator.EQ, FilterOperator.GT, FilterOperator.LT],
        personnelId: [FilterOperator.EQ],
      },
    });
  }

  private async isPersonnelExist(personnelId: number): Promise<void> {
    const personnel: boolean = await lastValueFrom(
      this.userClient.send(PersonnelMessage.IS_EXIST, { id: personnelId }),
    );

    if (!personnel)
      throw new NotFoundException('There is no personnel with this id');
  }
}
