import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Repository } from 'typeorm';
import { AttendanceService } from './attendance.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateAttendance } from './dto/create-attendance.type';
import { FindAllAttendace } from './dto/find-all-attendance.type';
import { FindOneAttendance } from './dto/find-one-attendance.type';
import { UpdateAttendance } from './dto/update-attendance.type';
import { RemoveAttendance } from './dto/remove-attendance.type';
import { AttendanceMessage } from '../../common/constants/message-patterns/attendance.messages';

export class AttendanceController {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
    private readonly attendanceService: AttendanceService,
  ) {}

  @MessagePattern(AttendanceMessage.CREATE_ATTENDANCE)
  async create(@Payload() dto: CreateAttendance) {
    return await this.attendanceService.create(dto);
  }

  @MessagePattern(AttendanceMessage.FIND_ALL_ATTENDANCE)
  async findAll(@Payload() { query }: FindAllAttendace) {
    return await this.attendanceService.findAll(query);
  }

  @MessagePattern(AttendanceMessage.FIND_ONE_ATTENDANCE)
  async findOne(@Payload() { id }: FindOneAttendance) {
    return await this.attendanceService.findOne(id);
  }

  @MessagePattern(AttendanceMessage.UPDATE_ATTENDANCE)
  async update(@Payload() dto: UpdateAttendance) {
    return await this.attendanceService.update(dto);
  }

  @MessagePattern(AttendanceMessage.DELETE_ATTENDANCE)
  async remove(@Payload() { id }: RemoveAttendance) {
    return await this.attendanceService.remove(id);
  }
}
