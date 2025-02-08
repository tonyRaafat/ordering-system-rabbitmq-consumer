import { IsHexadecimal } from 'class-validator';

export class FindOrderByIdDto {
  @IsHexadecimal()
  id: string;
}
