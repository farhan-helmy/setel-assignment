import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { OrderStatus } from './order-status.enum';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';

@Processor('order')
export class OrderProcessor {
  constructor(
    private ordersService: OrdersService,
    private ordersRepository: OrdersRepository,
  ) {}
  private readonly logger = new Logger(OrderProcessor.name);

  @Process('order_id')
  async handleTranscode(job: Job) {
    const order = await this.ordersService.getOrderById(job.data.id);

    order.status = OrderStatus.DELIVERED;
    this.ordersRepository.save(order);
    this.logger.debug('Start change to DELIVERED state...');
  }
}
