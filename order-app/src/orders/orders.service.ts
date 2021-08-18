import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersFilterDto } from './dto/get-order-filter.dto';
import { OrderCreatedEvent } from './events/order-created.event';
import { Order } from './order.entity';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersRepository)
    private ordersRepository: OrdersRepository,
    private eventEmitter: EventEmitter2,
  ) {}

  getOrders(filterDto: GetOrdersFilterDto): Promise<Order[]> {
    return this.ordersRepository.getOrders(filterDto);
  }

  async getOrderById(id: string): Promise<Order> {
    const found = await this.ordersRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return found;
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = await this.ordersRepository.createOrder(createOrderDto);

    const orderCreatedEvent = new OrderCreatedEvent();
    orderCreatedEvent.id = order.id;
    orderCreatedEvent.item_name = order.item_name;
    orderCreatedEvent.quantity = order.quantity;
    const test = await this.eventEmitter.emit(
      'order.created',
      orderCreatedEvent,
    );

    return order;
  }
}
