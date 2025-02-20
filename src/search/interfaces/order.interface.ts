export interface OrderDocument {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  createdAt: Date;
}
