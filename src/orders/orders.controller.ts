import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @EventPattern('place-order')
  handelPlaceOrder(@Payload() order: CreateOrderDto) {
    return this.ordersService.handelPlaceOrder(order);
  }
}
