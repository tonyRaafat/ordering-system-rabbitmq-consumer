import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto } from './dtos/create-order.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @EventPattern('place-order')
  handelPlaceOrder(@Payload() order: CreateOrderDto) {
    console.log(order);
    return this.appService.handelPlaceOrder(order);
  }
}
