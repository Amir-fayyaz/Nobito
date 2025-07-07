import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from 'src/configs/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { DoctorModule } from '../doctor/doctor.module';
import { AttendanceModule } from '../attendance/attendance.module';
import { TreatmentCategoryModule } from '../treatment-category/treatmentCategory.module';

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
