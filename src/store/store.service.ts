import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateStoreDTO } from './dto/create-store.dto';
import { UpdateStoreDTO } from './dto/update-store.dto';

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

  async update(data: UpdateStoreDTO, id: number) {
    return this.prisma.stores.update({
      data,
      where: {
        id,
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
