import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateStockControlDTO } from './dto/create-stock-control.dto';

@Injectable()
export class StockControlService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateStockControlDTO, user?: any) {
    const stock = await this.prisma.stock.findFirst({
      where: { id: data.stockId },
    });

    let newAmount = 0;
    if (data.typeChange === 0) {
      newAmount = stock.amount - Number(data.changeAmount);
    } else {
      newAmount = stock.amount + Number(data.changeAmount);
    }

    const stockControl = await this.prisma.stock_control.create({
      data: {
        stockId: data.stockId,
        saleId: data?.saleId,
        userId: data?.userId ? data?.userId : user.id,
        lastAmount: stock.amount,
        newAmount,
        changeAmount: Number(data.changeAmount),
        typeChange: data.typeChange,
        comment: data?.comment,
      },
      select: { id: true },
    });

    if (stockControl.id) {
      const update = await this.prisma.stock.update({
        data: {
          amount: newAmount,
        },
        where: {
          id: data.stockId,
        },
      });

      if(update.id){
        return {success: true, stockControl: stockControl.id, stockId: update.id}
      }
      
      this.prisma.stock_control.deleteMany({where: {id: stockControl.id}})
      throw new InternalServerErrorException('Não foi possível atualizar o estoque! Contate o suporte!')
    }
  }
}
