import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { StoreAdminGuard } from 'src/auth/guards/store-admin.guard';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Store } from 'src/decorators/store.decorator';

import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDTO } from './dto/update-category.dto';

@UseGuards(AuthGuard, StoreAdminGuard)
@Controller('categories')
export class CategoryController {

  constructor(private readonly categoryService: CategoryService){}

  @Post()
  async create(@Body() data: CreateCategoryDTO, @Store() storeId: number){
    return this.categoryService.create(data, storeId)
  }

  @Get()
  async list(@Store() storeId: number){
    return this.categoryService.list(storeId)
  }

  @Get(':id')
  async find(@ParamId() id: number){
    return this.categoryService.find(id)
  }

  @Patch(':id')
  async update(@Body() data: UpdateCategoryDTO, @ParamId() id: number){
    return this.categoryService.update(data, id)
  }

  @Patch(':id/active-action')
  async activeAction(@ParamId() id: number){
    return this.categoryService.activeAction(id)
  }
}
