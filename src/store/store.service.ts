import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateStoreDTO } from './dto/create-store.dto';

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateStoreDTO) {
    return this.prisma.stores.create({
      data,
      select: {
        id: true,
      },
    });
  }

  async storeExists(id: number) {
    const store = await this.prisma.stores.findFirst({ where: { id } });

    if (!store) {
      return false;
    }

    return true;
  }

  
}
