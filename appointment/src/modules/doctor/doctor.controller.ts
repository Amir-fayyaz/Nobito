import { MessagePattern, Payload } from '@nestjs/microservices';
import { DoctorMessage } from 'src/common/constants/message-patterns/doctor.messages';
import { CreateDoctor } from './dto/create-doctor.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { DoctorService } from './doctor.service';

export class DoctorController {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    private readonly doctorService: DoctorService,
  ) {}
  @MessagePattern(DoctorMessage.CREATE_DOCTOR)
  async create(@Payload() dto: CreateDoctor) {
    return await this.doctorService.create(dto);
  }
}
