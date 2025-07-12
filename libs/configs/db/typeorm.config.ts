import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Attendance } from 'apps/appointment/src/modules/attendance/entities/attendance.entity';
import { Doctor } from 'apps/appointment/src/modules/doctor/entities/doctor.entity';
import { AlergyHistory } from 'apps/appointment/src/modules/patient/entities/alergy-history.entity';
import { Medications } from 'apps/appointment/src/modules/patient/entities/medications.entity';
import { PatientStatus } from 'apps/appointment/src/modules/patient/entities/patient-status.entity';
import { Patient } from 'apps/appointment/src/modules/patient/entities/patient.entity';
import { SpecialDisease } from 'apps/appointment/src/modules/patient/entities/specialDisease.entity';
import { SurgeryHistory } from 'apps/appointment/src/modules/patient/entities/surgery-history.entity';
import { TreatmentCategory } from 'apps/appointment/src/modules/treatment/entities/treatmentCategory.entity';
import { Position } from 'apps/user/src/modules/auth/entities/position.entity';
import { Role } from 'apps/user/src/modules/auth/entities/role.entity';
import { Personnel } from 'apps/user/src/modules/personnel/entities/personnel.entity';
import { User } from 'apps/user/src/modules/user/entities/user.entity';
import { config } from 'dotenv';

config();

export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor() {}
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      host: process.env.DB_HOST,
      type: process.env.DB_TYPE as any,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: Number(process.env.DB_PORT),
      // entities: [
      //   'dist/**/**/**/*.entity{.ts,.js}',
      //   'dist/**/**/*.entity{.ts,.js}',
      // ],
      entities: [
        User,
        Role,
        Position,
        Personnel,
        Attendance,
        Doctor,
        TreatmentCategory,
        Patient,
        SpecialDisease,
        AlergyHistory,
        Medications,
        SurgeryHistory,
        PatientStatus,
      ],

      synchronize: process.env.NODE_ENV === 'production',
    };
  }
}
