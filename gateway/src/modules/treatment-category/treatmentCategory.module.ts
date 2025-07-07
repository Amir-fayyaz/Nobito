import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Env } from 'src/common/constants/env';
import { AppointmentRabbitmq } from 'src/common/constants/rabbitmq';
import { TreatmentCategoryController } from './treatmentCategory.controller';
import { TreatmentCategoryService } from './treatmentCategory.service';

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
  controllers: [TreatmentCategoryController],
  providers: [TreatmentCategoryService],
  exports: [],
})
export class TreatmentCategoryModule {}
