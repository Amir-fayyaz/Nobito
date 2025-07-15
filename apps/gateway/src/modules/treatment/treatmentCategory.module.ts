import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TreatmentCategoryService } from './service/treatmentCategory.service';
import { Env } from '../../common/constants/env';
import { TreatmentCategoryController } from './controllers/treatmentCategory.controller';
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
  controllers: [TreatmentCategoryController],
  providers: [TreatmentCategoryService],
  exports: [],
})
export class TreatmentCategoryModule {}
