import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}
  async handelPlaceOrder(order: CreateOrderDto) {
    return await this.orderModel.create(order);
  }
}
