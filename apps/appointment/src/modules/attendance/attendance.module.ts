import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Env } from '../../common/constants/env';
import { RabbitMQEnviroments } from 'libs/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendance]),
    ClientsModule.register([
      {
        name: RabbitMQEnviroments.AppointmentService_Name,
        transport: Transport.RMQ,
        options: {
          urls: [Env.RABBITMQ_URL as string],
          queue: RabbitMQEnviroments.Appointment_queue,
          queueOptions: { durable: true },
        },
      },
      {
        name: RabbitMQEnviroments.UserService_Name,
        transport: Transport.RMQ,
        options: {
          urls: [Env.RABBITMQ_URL as string],
          queue: RabbitMQEnviroments.User_Queue,
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
