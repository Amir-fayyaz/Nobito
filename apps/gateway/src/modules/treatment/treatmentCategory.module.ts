import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TreatmentCategoryService } from './service/treatmentCategory.service';
import { AppointmentRabbitmq } from '../../common/constants/rabbitmq';
import { Env } from '../../common/constants/env';
import { TreatmentCategoryController } from './controllers/treatmentCategory.controller';

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
