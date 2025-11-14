import { AppCacheModule } from '@common/modules/cache.module';
import { RedisModule } from '@common/modules/redis.module';
import { TypeOrmConfig } from '@config/typeorm.config';
import { AuthModule } from '@module/auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
    }),
    AuthModule,
    RedisModule.forRootAsync(),
    AppCacheModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
