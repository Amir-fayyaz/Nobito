import { MessagePattern, Payload } from '@nestjs/microservices';
import { PatientService } from '../services/patient.service';
import { CreatePatient } from '../dto/create-patient.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from '../entities/patient.entity';
import { Repository } from 'typeorm';
import { PatientMessage } from 'libs/message-patterns';

export class PatientController {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    private readonly patientService: PatientService,
  ) {}

  @MessagePattern(PatientMessage.CREATE)
  async create(@Payload() dto: CreatePatient) {
    return await this.patientService.create(dto);
  }
}
