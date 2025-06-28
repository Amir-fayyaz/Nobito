import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from 'src/configs/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { DoctorModule } from '../doctor/doctor.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
    }),
    DoctorModule,
  ],
  providers: [TypeOrmConfig],
})
export class AppModule {}
