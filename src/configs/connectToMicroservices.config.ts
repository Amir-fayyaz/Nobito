import { INestApplication } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export async function ConnectToMicroservices(app: INestApplication) {
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://username:password@localhost:5672'],
      queue: 'gateway_queue',
      queueOptions: { durable: true },
      noAck: false,
    },
  });

  await app.startAllMicroservices();
}
