import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DoctorModule } from '../doctor/doctor.module';
import { AttendanceModule } from '../attendance/attendance.module';
import { TreatmentCategoryModule } from '../treatment/treatmentCategory.module';
import { TypeOrmConfig } from 'libs/configs/db';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
    }),
    DoctorModule,
    AttendanceModule,
    TreatmentCategoryModule,
  ],
  providers: [TypeOrmConfig],
})
export class AppModule {}
