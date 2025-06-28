import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { RabbitmqEnviroments } from 'src/common/constants/rabbitmq';
import { Env } from 'src/common/constants/env';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor]),
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
  controllers: [DoctorController],
  providers: [DoctorService],
  exports: [],
})
export class DoctorModule {}
