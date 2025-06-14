import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Env } from 'src/common/constants/env';
import { UserRabbitmq } from 'src/common/constants/rabbitmq';

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
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
