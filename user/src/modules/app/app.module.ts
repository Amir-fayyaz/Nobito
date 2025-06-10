import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from 'src/configs/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useClass: TypeOrmConfig })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
