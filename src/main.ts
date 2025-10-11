import { AppModule } from '@module/app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(Number(process.env.APP_PORT), async () => {
    Logger.log(
      `Gateway service is runnung on port ${process.env.APP_PORT}`,
      'Logger',
    );
    Logger.log(`docs are available on ${await app.getUrl()}/docs`, 'Logger');
  });
}
bootstrap();
