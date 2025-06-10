import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Env } from 'src/common/constants/env';
import { RabbitMQEnviroments } from 'src/common/constants/rabbitmq';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RabbitMQEnviroments.UserService_Name,
        transport: Transport.RMQ,
        options: {
          urls: [Env.RABBITMQ_URL as string],
          queue: RabbitMQEnviroments.User_Queue,
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class UserModule {}
