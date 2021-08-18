import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  item_name: string;

  @IsNotEmpty()
  quantity: number;
}
