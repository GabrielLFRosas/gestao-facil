import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StockControlModule } from 'src/stock-control/stock-control.module';
import { StockModule } from 'src/stock/stock.module';
import { UserModule } from 'src/user/user.module';

import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, StockModule, StockControlModule],
  controllers: [SaleController],
  providers: [SaleService],
  exports: [SaleService]
})
export class SaleModule {}
