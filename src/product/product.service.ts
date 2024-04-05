import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StockService } from 'src/stock/stock.service';

import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stockService: StockService,
  ) {}

  async create(data: CreateProductDTO, storeId: number) {
    const productId = await this.prisma.products.create({
      data: {
        name: data.name,
        storeId: storeId,
        categoryId: data.categoryId,
        description: data.description,
        price: Number(data.price),
        costPrice: Number(data.costPrice),
        ativo: data?.ativo ? 1 : 0,
      },
      select: { id: true },
    });

    if (productId) {
      const stock = await this.stockService.create({
        productId: productId.id,
        typeAmount: data?.typeAmount,
      });

      if (!stock.success) {
        await this.prisma.products.delete({ where: { id: productId.id } });
        throw new InternalServerErrorException(
          'Não foi possível criar o estoque deste produto! Contate o suporte!',
        );
      }

      return {
        stockId: stock.id,
        productId: productId.id,
      };
    }
  }

  async list(storeId: number) {
    return this.prisma.products.findMany({
      where: {
        storeId,
      },
    });
  }

  async find(id: number) {
    return this.prisma.products.findFirst({
      where: {
        id,
      },
    });
  }

  async update(data: UpdateProductDTO, id: number) {
    return this.prisma.products.update({
      data: {
        name: data.name,
        categoryId: data.categoryId,
        description: data.description,
        price: Number(data.price),
        costPrice: Number(data.costPrice),
      },
      where: {
        id,
      },
    });
  }

  async activeAction(id: number) {
    const product = await this.prisma.products.findFirst({where: {
      id
    }})
    return this.prisma.products.update({
      data: {
       ativo: product.ativo === 1 ? 0 : 1
      },
      where: {
        id,
      },
    });
  }
}
