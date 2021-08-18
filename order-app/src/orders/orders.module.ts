import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderCreatedListener } from './listeners/order-created.listener';
import { OrdersController } from './orders.controller';
import { OrderProcessor } from './orders.processor';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersRepository]),
    BullModule.registerQueue({
      name: 'order',
    }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderCreatedListener, OrderProcessor],
})
export class OrdersModule {}
