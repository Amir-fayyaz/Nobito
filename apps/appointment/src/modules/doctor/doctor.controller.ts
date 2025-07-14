import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateDoctor } from './dto/create-doctor.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { DoctorService } from './doctor.service';
import { FindAllDoctors } from './dto/find-all-doctors.type';
import { FindOneDoctorById } from './dto/find-one-by-id.type';
import { UpdateDoctor } from './dto/update-doctor.type';
import { RemoveDoctor } from './dto/remove-doctor.type';
import { DoctorMessage } from 'libs/message-patterns';

export class DoctorController {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    private readonly doctorService: DoctorService,
  ) {}
  @MessagePattern(DoctorMessage.CREATE)
  async create(@Payload() dto: CreateDoctor) {
    return await this.doctorService.create(dto);
  }

  @MessagePattern(DoctorMessage.FIND_ALL)
  async findAll(@Payload() { query }: FindAllDoctors) {
    return await this.doctorService.findAll(query);
  }

  @MessagePattern(DoctorMessage.FIND_ONE)
  async findOneById(@Payload() { id }: FindOneDoctorById) {
    return await this.doctorService.findOneById(id);
  }

  @MessagePattern(DoctorMessage.UPDATE)
  async update(@Payload() dto: UpdateDoctor) {
    return await this.doctorService.update(dto);
  }

  @MessagePattern(DoctorMessage.DELETE_)
  async remove(@Payload() { id }: RemoveDoctor) {
    return await this.doctorService.remove(id);
  }
}
