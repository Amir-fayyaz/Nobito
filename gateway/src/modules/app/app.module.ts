import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserRabbitmq } from 'src/common/constants/rabbitmq';
import { Env } from 'src/common/constants/env';
import { RedisModule } from 'src/common/modules/redis.module';
import { AppCacheModule } from 'src/common/modules/cache.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { PersonnelModule } from '../personnel/personnel.module';
import { DoctorModule } from '../doctor/doctor.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
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
    RedisModule.forRootAsync(),
    AppCacheModule,
    AuthModule,
    PersonnelModule,
    DoctorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
