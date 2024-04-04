import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StockService } from 'src/stock/stock.service';

import { CreateProductDTO } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stockService: StockService,
  ) {}

  async create(data: CreateProductDTO) {
    const productId = await this.prisma.products.create({
      data: {
        name: data.name,
        storeId: data.storeId,
        categoryId: data.categoryId,
        description: data.description,
        price: Number(data.price),
        ativo: data?.ativo ? 1 : 0,
      },
      select: { id: true },
    });

    if (productId) {
      const stock = await this.stockService.create({
        productId: productId.id,
        typeAmount: data?.typeAmount,
      });

      if(!stock.success){
        await this.prisma.products.delete({where: {id: productId.id}})
        throw new InternalServerErrorException('Não foi possível criar o estoque deste produto! Contate o suporte!')
      }

      return {
        stockId: stock.id,
        productId: productId.id
      }
    }
  }
}
