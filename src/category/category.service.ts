import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateCategoryDTO } from './dto/create-category.dto';

@Injectable()
export class CategoryService {

  constructor(private readonly prisma: PrismaService){}

  async create(data: CreateCategoryDTO){
    return this.prisma.categories.create({data: {
      name: data.name,
      storeId: data.storeId,
      ativo: data.ativo ? 1 : 0
    }})
  }
}
