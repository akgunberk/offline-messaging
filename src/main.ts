import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*   const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    baseApp,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'anotherQ',
        queueOptions: {
          durable: false,
        },
      },
    },
  ); */

  app.useGlobalPipes(new ValidationPipe());
  app.listen(4000);
}
bootstrap();
