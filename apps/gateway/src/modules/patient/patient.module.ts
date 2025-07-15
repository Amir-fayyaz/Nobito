import { Module } from '@nestjs/common';
import { PatientController } from './controllers/patient.controller';
import { PatientService } from './services/patient.service';
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
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
