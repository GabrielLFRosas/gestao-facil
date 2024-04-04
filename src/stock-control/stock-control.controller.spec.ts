import { Test, TestingModule } from '@nestjs/testing';
import { StockControlController } from './stock-control.controller';

describe('StockControlController', () => {
  let controller: StockControlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockControlController],
    }).compile();

    controller = module.get<StockControlController>(StockControlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
