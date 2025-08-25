import { AppCacheModule } from '@common/modules/cache.module';
import { TypeOrmConfig } from '@config/typeorm.config';
import { AuthModule } from '@module/auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfig }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    AppCacheModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
