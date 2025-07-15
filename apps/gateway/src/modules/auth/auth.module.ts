import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { RoleService } from './services/role.service';
import { RoleController } from './controllers/role.controller';
import { PositionService } from './services/position.service';
import { PositionController } from './controllers/position.controller';
import { Env } from '../../common/constants/env';
import { CacheService } from '../../common/services/cache.service';
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
  controllers: [AuthController, RoleController, PositionController],
  providers: [AuthService, CacheService, RoleService, PositionService],
  exports: [],
})
export class AuthModule {}
