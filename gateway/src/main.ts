import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { Swagger } from './configs/swagger-setup.config';
import { Logger } from '@nestjs/common';
import { ConnectToMicroservices } from './configs/connectToMicroservices.config';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  Swagger(app);
  await ConnectToMicroservices(app);

  await app.listen(Number(process.env.APP_PORT), () => {
    Logger.log(`Gateway service is runnung on port ${process.env.APP_PORT}`);
  });
}
bootstrap();
