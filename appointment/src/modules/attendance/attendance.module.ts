import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitmqEnviroments } from 'src/common/constants/rabbitmq';
import { Env } from 'src/common/constants/env';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendance]),
    ClientsModule.register([
      {
        name: RabbitmqEnviroments.AppointmentService_Name,
        transport: Transport.RMQ,
        options: {
          urls: [Env.RABBITMQ_URL as string],
          queue: RabbitmqEnviroments.Appointment_queue,
          queueOptions: { durable: true },
        },
      },
      {
        name: RabbitmqEnviroments.UserService_Name,
        transport: Transport.RMQ,
        options: {
          urls: [Env.RABBITMQ_URL as string],
          queue: RabbitmqEnviroments.User_Queue,
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService],
  exports: [],
})
export class AttendanceModule {}
