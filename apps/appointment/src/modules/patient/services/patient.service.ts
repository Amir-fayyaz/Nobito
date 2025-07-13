import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientStatus } from '../entities/patient-status.entity';
import { Repository } from 'typeorm';
import { Patient } from '../entities/patient.entity';
import { AlergyHistory } from '../entities/alergy-history.entity';
import { SpecialDisease } from '../entities/specialDisease.entity';
import { SurgeryHistory } from '../entities/surgery-history.entity';
import { CreatePatient } from '../dto/create-patient.type';
import { execptionError } from 'apps/appointment/src/common/@types/eception.type';

@Injectable()
export class PatientService {
  constructor(
    // @InjectRepository(PatientStatus)
    // private readonly patientStatusRepository: Repository<PatientStatus>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    // @InjectRepository(AlergyHistory)
    // private readonly alergyRepository: Repository<AlergyHistory>,
    // @InjectRepository(Patient)
    // private readonly medicationRepository: Repository<Patient>,
    // @InjectRepository(SpecialDisease)
    // private readonly specialDeseaseRepository: Repository<SpecialDisease>,
    // @InjectRepository(SurgeryHistory)
    // private readonly surgeryRepository: Repository<SurgeryHistory>,
  ) {}

  async create(dto: CreatePatient): Promise<Patient | execptionError> {
    try {
      const newPatient = this.patientRepository.create(dto);
      return await this.patientRepository.save(newPatient);
    } catch (error) {
      return { status: error.status, message: error.message };
    }
  }
}
