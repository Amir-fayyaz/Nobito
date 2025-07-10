import { Module } from '@nestjs/common';
import { PersonnelController } from './personnel.controller';
import { PersonnelService } from './personnel.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserRabbitmq } from '../../common/constants/rabbitmq';
import { Env } from '../../common/constants/env';
import { S3Service } from '../../common/services/S3.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: UserRabbitmq.UserService_Name,
        transport: Transport.RMQ,
        options: {
          urls: [Env.RABBITMQ_URL as string],
          queue: UserRabbitmq.User_Queue,
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
