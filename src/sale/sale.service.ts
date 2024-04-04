import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TypeChangeEnum } from 'src/enums/type-change.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStockControlDTO } from 'src/stock-control/dto/create-stock-control.dto';
import { StockControlService } from 'src/stock-control/stock-control.service';
import { StockService } from 'src/stock/stock.service';

import { CreateSaleDTO, ProductsSalesDTO } from './dto/create-sale.dto';

@Injectable()
export class SaleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stockService: StockService,
    private readonly stockControlService: StockControlService,
  ) {}

  async create(data: CreateSaleDTO, storeId: number, userId: number) {
    try {
      let sale;
      await this.prisma.$transaction(async (trx) => {
        sale = await trx.sales.create({
          data: {
            storeId,
            clientId: data?.clientId,
            value: Number(data.value),
            totalValue: Number(data.totalValue),
            discount: Number(data?.discount),
            comment: data.comment,
            paymentMehod: data.paymentMethod,
            createdBy: userId,
          },
          select: { id: true },
        });

        if (!sale.id) {
          throw new InternalServerErrorException(
            'Não foi possível criar a venda!',
          );
        }
        const dataSalesProduct = [];
        const dataStockControl: CreateStockControlDTO[] = [];

        await Promise.all(
          data.products.map(async (product: ProductsSalesDTO) => {
            const stock = await this.stockService.getByProduct(
              product.productId,
            );
            const item1: CreateStockControlDTO = {
              stockId: stock.id,
              userId,
              saleId: sale.id,
              changeAmount: product.amount,
              typeChange: TypeChangeEnum.SUB,
              comment: `Venda ID:${sale.id}`,
            };

            const item = {
              saleId: sale.id,
              productId: product.productId,
              amount: Number(product.amount),
              value: Number(product.value),
              discount: product?.discount,
            };

            dataStockControl.push(item1);
            dataSalesProduct.push(item);
          }),
        );

        const saleProduct = await trx.sale_products.createMany({
          data: dataSalesProduct,
        });

        const stockControl = await this.stockControlService.createMany(dataStockControl, userId)
      });

      return {
        succcess: true, 
        saleId: sale.id
      }
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(
        'Não foi possível realizar a venda! Contate o suporte',
      );
    }
  }
}
