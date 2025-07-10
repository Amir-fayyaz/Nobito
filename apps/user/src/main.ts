import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { config } from 'dotenv';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://username:password@localhost:5672'],
        queue: 'user_queue',
        queueOptions: { durable: true },
        noAck: false,
      },
    },
  );
  await app.listen();
  Logger.log('User-service is listening on rabbit-mq', 'NestLogger');
}
bootstrap();
