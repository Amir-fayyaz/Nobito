import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  // imports: [TypeOrmModule.forRootAsync({ useClass: TypeOrmConfig })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
