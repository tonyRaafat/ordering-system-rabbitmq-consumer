import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { FindOrderByIdDto } from './dto/find-order-by-id.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @EventPattern('place-order')
  handelPlaceOrder(@Payload() order: CreateOrderDto) {
    return this.ordersService.handelPlaceOrder(order);
  }
  @MessagePattern({ cmd: 'get-all-orders' })
  getAllOrders() {
    return this.ordersService.getAllOrders();
  }
  @MessagePattern({ cmd: 'get-order-by-id' })
  getOrderById(@Payload() data: FindOrderByIdDto) {
    const id = data.id;
    return this.ordersService.getOrderById(id);
  }
}
