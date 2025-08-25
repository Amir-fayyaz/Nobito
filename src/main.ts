import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { Swagger } from './configs/swagger-setup.config';
import { AppModule } from './modules/app/app.module';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  Swagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(Number(process.env.APP_PORT), () => {
    Logger.log(
      `Gateway service is runnung on port ${process.env.APP_PORT}`,
      'NestLogger',
    );
  });
}
bootstrap();
