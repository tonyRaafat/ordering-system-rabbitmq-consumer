import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'elastic-queue',
        exchange: 'demo',
        routingKey: 'key-r',
      },
    },
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}
bootstrap();
