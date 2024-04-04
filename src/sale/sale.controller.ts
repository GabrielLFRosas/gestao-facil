import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { users } from '@prisma/client';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Store } from 'src/decorators/store.decorator';
import { User } from 'src/decorators/user.decorator';

import { CreateSaleDTO } from './dto/create-sale.dto';
import { SaleService } from './sale.service';

@UseGuards(AuthGuard)
@Controller('sales')
export class SaleController {

  constructor(private readonly saleService: SaleService){}

  @Post()
  async create(@Body() data: CreateSaleDTO, @Store() storeId: number, @User() user: users){
    return this.saleService.create(data, storeId, user.id);
  }
}
