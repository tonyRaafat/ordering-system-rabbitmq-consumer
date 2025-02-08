import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrderRepository) {}
  async handelPlaceOrder(order: CreateOrderDto) {
    return await this.orderRepository.create(order);
  }

  async getAllOrders() {
    return this.orderRepository.find({});
  }
  async getOrderById(id) {
    return this.orderRepository.findById(id);
  }
}
