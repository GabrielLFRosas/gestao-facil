import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';

import { CreateStockDTO } from './dto/create-stock.dto';
import { StockService } from './stock.service';

@UseGuards(AuthGuard, AdminGuard)
@Controller('stock')
export class StockController {

  constructor(private readonly stockService: StockService){}

  @Post()
  async create(@Body() data: CreateStockDTO){
    return this.stockService.create(data)
  }
}
