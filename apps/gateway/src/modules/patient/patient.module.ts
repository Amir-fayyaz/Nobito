import { Module } from '@nestjs/common';
import { PatientController } from './controllers/patient.controller';
import { PatientService } from './services/patient.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppointmentRabbitmq } from '../../common/constants/rabbitmq';
import { Env } from '../../common/constants/env';

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
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
