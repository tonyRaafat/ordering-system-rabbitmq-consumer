import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/order-system'),
    SearchModule,
  ],
})
export class AppModule {}
