import { Test } from '@nestjs/testing';
import { OrderCreatedListener } from './listeners/order-created.listener';
import { OrderStatus } from './order-status.enum';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';

const mockOrdersRepository = () => ({
  getOrders: jest.fn(),
  findOne: jest.fn(),
  createOrder: jest.fn(),
});

const mockOrder = {
  status: OrderStatus.CREATED,
};
describe('OrdersService', () => {
  let ordersService: OrdersService;
  let ordersRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        OrdersService,
        OrderCreatedListener,
        { provide: OrdersRepository, useFactory: mockOrdersRepository },
      ],
    }).compile();

    ordersService = module.get(OrdersService);
    ordersRepository = module.get(OrdersRepository);
  });

  describe('getOrders', () => {
    it('calls OrderRepository.getTasks and returns the result', async () => {
      ordersRepository.getOrders.mockResolvedValue('someValue');
      const result = await ordersService.getOrders(mockOrder);
      expect(result).toEqual('someValue');
    });
  });
});
