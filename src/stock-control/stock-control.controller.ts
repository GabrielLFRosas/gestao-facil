import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { StoreAdminGuard } from 'src/auth/guards/store-admin.guard';
import { User } from 'src/decorators/user.decorator';

import { CreateStockControlDTO } from './dto/create-stock-control.dto';
import { StockControlService } from './stock-control.service';

@UseGuards(AuthGuard, StoreAdminGuard)
@Controller('stock-control')
export class StockControlController {

  constructor(private readonly stockControlService: StockControlService){}

  @Post()
  async create(@Body() data: CreateStockControlDTO, @User() user: any){
    return this.stockControlService.create(data);
  }
}
