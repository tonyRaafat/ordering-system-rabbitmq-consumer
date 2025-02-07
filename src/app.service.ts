import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dtos/create-order.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  handelPlaceOrder(order: CreateOrderDto) {
    console.log(
      `recived new order from this customer email: ${order.email} the product name is ${order.productName} and quantity is  ${order.quantity} `,
    );
  }
}
