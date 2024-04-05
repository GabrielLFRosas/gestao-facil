import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDTO } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCategoryDTO, storeId: number) {
    return this.prisma.categories.create({
      data: {
        name: data.name,
        storeId: storeId,
        ativo: data.ativo ? 1 : 0,
      },
    });
  }

  async list(storeId: number) {
    return this.prisma.categories.findMany({ where: { storeId } });
  }

  async find(id: number) {
    return this.prisma.categories.findFirst({
      where: {
        id,
      },
    });
  }

  async update(data: UpdateCategoryDTO, id: number) {
    return this.prisma.categories.update({
      data: {
        name: data.name,
      },
      where: {
        id,
      },
    });
  }

  async activeAction(id: number) {
    const category = await this.prisma.categories.findFirst({ where: { id } });
    return this.prisma.categories.update({
      data: {
        ativo: category.ativo === 1 ? 0 : 1,
      },
      where: {
        id,
      },
    });
  }
}
