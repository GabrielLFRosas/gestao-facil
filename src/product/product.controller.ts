import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { StoreAdminGuard } from 'src/auth/guards/store-admin.guard';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Store } from 'src/decorators/store.decorator';

import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductService } from './product.service';

@UseGuards(AuthGuard, StoreAdminGuard)
@Controller('products')
export class ProductController {

  constructor(private readonly productService: ProductService){}

  @Post()
  async create(@Body() data: CreateProductDTO, @Store() storeId: number){
    return this.productService.create(data, storeId);
    
  }

  @Get()
  async list(@Store() storeId: number){
    return this.productService.list(storeId);
  }

  @Get(':id')
  async find(@ParamId() id: number){
    return this.productService.find(id);
  }

  @Patch(':id')
  async update(@Body() data: UpdateProductDTO,@ParamId() id: number){
    return this.productService.update(data, id);
  }

  @Patch(':id/active-action')
  async activeAction(@ParamId() id: number){
    return this.productService.activeAction(id);
  }
}
