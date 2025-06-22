import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from 'src/configs/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQEnviroments } from 'src/common/constants/rabbitmq';
import { Env } from 'src/common/constants/env';
import { AuthModule } from '../auth/auth.module';
import { S3Module } from '../file/S3.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
    }),
    UserModule,
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
    AuthModule,
    S3Module,
  ],
  providers: [TypeOrmConfig],
})
export class AppModule {}
