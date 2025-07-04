import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Repository } from 'typeorm';
import { AttendanceService } from './attendance.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AttendanceMessage } from 'src/common/constants/message-patterns/attendance.messages';
import { CreateAttendance } from './dto/create-attendance.type';
import { FindAllAttendace } from './dto/find-all-attendance.type';

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
}
