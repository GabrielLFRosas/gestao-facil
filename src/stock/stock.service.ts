import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateStockDTO } from './dto/create-stock.dto';

@Injectable()
export class StockService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateStockDTO) {
    console.log(data);
    try {
      const stock = await this.prisma.stock.create({
        data: {
          productId: data.productId,
          typeAmount: data?.typeAmount,
        },
        select: {
          id: true,
        },
      });

      return { id: stock.id, success: true };
    } catch (err) {
      return { success: false, message: err };
    }
  }

  async getByProduct(productId: number) {
      const stock = await this.prisma.stock.findFirst({
        where: {productId}
      });

      return stock;
   
  }

  
}
