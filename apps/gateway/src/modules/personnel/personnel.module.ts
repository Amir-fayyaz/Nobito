import { Module } from '@nestjs/common';
import { PersonnelController } from './personnel.controller';
import { PersonnelService } from './personnel.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Env } from '../../common/constants/env';
import { S3Service } from '../../common/services/S3.service';
import { RabbitMQEnviroments } from 'libs/constants';

@Module({
  imports: [
    ClientsModule.register([
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
  controllers: [PersonnelController],
  providers: [PersonnelService, S3Service],
  exports: [],
})
export class PersonnelModule {}
