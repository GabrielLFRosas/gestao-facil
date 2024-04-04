import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { StoreAdminGuard } from 'src/auth/guards/store-admin.guard';

import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/create-category.dto';

@UseGuards(StoreAdminGuard)
@Controller('categories')
export class CategoryController {

  constructor(private readonly categoryService: CategoryService){}

  @Post()
  async create(@Body() data: CreateCategoryDTO){
    return this.categoryService.create(data)
  }
}
