import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'elastic-queue',
          exchange: 'demo',
          routingKey: 'key-r',
        },
      },
    ]),
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
      // auth: {
      //   username: 'elastic',
      //   password: 'your_password', // Replace with your actual Elasticsearch password
      // },
      // tls: {
      //   rejectUnauthorized: false, // Only use this in development
      // },
    }),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
