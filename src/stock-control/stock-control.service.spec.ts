import { Test, TestingModule } from '@nestjs/testing';
import { StockControlService } from './stock-control.service';

describe('StockControlService', () => {
  let service: StockControlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockControlService],
    }).compile();

    service = module.get<StockControlService>(StockControlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
