import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { StoreAdminGuard } from 'src/auth/guards/store-admin.guard';
import { Store } from 'src/decorators/store.decorator';

import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/create-category.dto';

@UseGuards(AuthGuard, StoreAdminGuard)
@Controller('categories')
export class CategoryController {

  constructor(private readonly categoryService: CategoryService){}

  @Post()
  async create(@Body() data: CreateCategoryDTO, @Store() storeId: number){
    return this.categoryService.create(data, storeId)
  }
}
