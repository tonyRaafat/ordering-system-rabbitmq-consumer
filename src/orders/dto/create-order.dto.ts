/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  productName: string;
  @IsNumber()
  @IsPositive()
  quantity: number;
}
