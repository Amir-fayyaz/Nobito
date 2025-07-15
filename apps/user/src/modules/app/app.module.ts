import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from '../auth/auth.module';
import { PersonnelModule } from '../personnel/personnel.module';
import { Env } from '../../common/constants/env';
import { TypeOrmConfig } from 'libs/configs/db';
import { RabbitMQEnviroments } from 'libs/constants';

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
    PersonnelModule,
  ],
  providers: [TypeOrmConfig],
})
export class AppModule {}
