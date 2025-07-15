import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Env } from '../../common/constants/env';
import { RabbitMQEnviroments } from 'libs/constants';

@Module({
  imports: [
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
    ]),
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
  exports: [],
})
export class DoctorModule {}
