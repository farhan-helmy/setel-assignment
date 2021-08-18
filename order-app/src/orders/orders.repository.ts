import { EntityRepository, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersFilterDto } from './dto/get-order-filter.dto';
import { OrderStatus } from './order-status.enum';
import { Order } from './order.entity';

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  async getOrders(filterDto: GetOrdersFilterDto): Promise<Order[]> {
    const { status } = filterDto;
    const query = this.createQueryBuilder('order');

    if (status) {
      query.andWhere('order.status = :status', { status });
    }

    const orders = await query.getMany();
    return orders;
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { item_name, quantity } = createOrderDto;

    const order = this.create({
      item_name,
      quantity,
      status: OrderStatus.CREATED,
    });

    await this.save(order);

    return order;
  }
}
