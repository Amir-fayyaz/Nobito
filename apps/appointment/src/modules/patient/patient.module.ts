import { Module } from '@nestjs/common';
import { PatientController } from './controllers/patient.controller';
import { PatientService } from './services/patient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlergyHistory } from './entities/alergy-history.entity';
import { Medications } from './entities/medications.entity';
import { Patient } from './entities/patient.entity';
import { PatientStatus } from './entities/patient-status.entity';
import { SpecialDisease } from './entities/specialDisease.entity';
import { SurgeryHistory } from './entities/surgery-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AlergyHistory,
      Medications,
      Patient,
      PatientStatus,
      SpecialDisease,
      SurgeryHistory,
    ]),
  ],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [],
})
export class PatientModule {}
