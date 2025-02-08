import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type OrderDocument = Document & Order;

@Schema()
export class Order {
  @Prop()
  email: string;

  @Prop()
  productName: string;

  @Prop()
  quantity: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
