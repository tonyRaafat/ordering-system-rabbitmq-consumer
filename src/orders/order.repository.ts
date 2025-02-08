import { Injectable } from '@nestjs/common';
import { EntityRepository } from '../database/entity.repository';
import { Order, OrderDocument } from './entities/order.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrderRepository extends EntityRepository<OrderDocument> {
  constructor(
    @InjectModel(Order.name) readonly orderModel: Model<OrderDocument>,
  ) {
    super(orderModel);
  }
}
