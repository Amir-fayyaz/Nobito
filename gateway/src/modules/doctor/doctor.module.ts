import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppointmentRabbitmq } from 'src/common/constants/rabbitmq';
import { Env } from 'src/common/constants/env';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AppointmentRabbitmq.AppointmentService_Name,
        transport: Transport.RMQ,
        options: {
          urls: [Env.RABBITMQ_URL as string],
          queue: AppointmentRabbitmq.Appointment_queue,
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
