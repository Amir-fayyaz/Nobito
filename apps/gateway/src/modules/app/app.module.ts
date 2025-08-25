import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from 'libs/config/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useClass: TypeOrmConfig })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
