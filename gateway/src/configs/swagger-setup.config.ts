import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function Swagger(app: INestApplication) {
  const configs = new DocumentBuilder()
    .setTitle('snapp-food')
    .setDescription('snapp-food api version 1')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        bearerFormat: 'JWT',
        in: 'header',
        scheme: 'bearer',
      },
      'Authorization',
    )
    .build();

  const document = SwaggerModule.createDocument(app, configs);

  SwaggerModule.setup('/docs', app, document);
}
