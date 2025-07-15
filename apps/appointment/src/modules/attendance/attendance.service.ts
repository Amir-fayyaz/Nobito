import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Repository } from 'typeorm';
import { CreateAttendance } from './dto/create-attendance.type';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { UpdateAttendance } from './dto/update-attendance.type';
import { execptionError } from '../../common/@types/eception.type';
import { PersonnelMessage } from 'libs/message-patterns';
import { RabbitMQEnviroments } from 'libs/constants';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRespository: Repository<Attendance>,
    @Inject(RabbitMQEnviroments.UserService_Name)
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

  async findOne(id: number): Promise<Attendance | null> {
    return await this.attendanceRespository.findOne({ where: { id } });
  }

  async update(
    dto: UpdateAttendance,
  ): Promise<number | undefined | execptionError> {
    try {
      await this.isPersonnelExist(dto.personnelId);
    } catch (error) {
      return { status: 404, message: error.message };
    }
    return (await this.attendanceRespository.update({ id: dto.id }, { ...dto }))
      .affected;
  }

  async remove(id: number): Promise<number> {
    return (await this.attendanceRespository.delete({ id })).affected as number;
  }

  private async isPersonnelExist(personnelId: number): Promise<void> {
    const personnel: boolean = await lastValueFrom(
      this.userClient.send(PersonnelMessage.IS_EXIST, { id: personnelId }),
    );

    if (!personnel)
      throw new NotFoundException('There is no personnel with this id');
  }
}
