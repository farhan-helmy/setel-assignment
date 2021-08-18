import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from '../events/order-created.event';
import axios from 'axios';
import { OrdersService } from '../orders.service';
import { OrdersRepository } from '../orders.repository';
import { OrderStatus } from '../order-status.enum';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class OrderCreatedListener {
  constructor(
    private ordersService: OrdersService,
    private ordersRepository: OrdersRepository,
    @InjectQueue('order') private readonly orderQueue: Queue,
  ) {}

  @OnEvent('order.created')
  async handleOrderCreatedEvent(event: OrderCreatedEvent) {
    //console.log(event);
    const order = await this.ordersService.getOrderById(event.id);

    await axios
      .post('http://localhost:5000/payment', event)
      .then(async (res) => {
        if (res.data.status === 'declined') {
          order.status = OrderStatus.CANCELLED;
          const orderstat = await this.ordersRepository.save(order);
          return orderstat;
        }

        if (res.data.status === 'confirmed') {
          order.status = OrderStatus.CONFIRMED;
          const orderstat = await this.ordersRepository.save(order);

          await this.orderQueue.add(
            'order_id',
            {
              id: order.id,
            },
            { delay: 3000 },
          );

          return orderstat;
        }
      });
  }
}
