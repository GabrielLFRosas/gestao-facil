import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { StoreAdminGuard } from 'src/auth/guards/store-admin.guard';

import { CreateProductDTO } from './dto/create-product.dto';
import { ProductService } from './product.service';

@UseGuards(StoreAdminGuard)
@Controller('products')
export class ProductController {

  constructor(private readonly productService: ProductService){}

  @Post()
  async create(@Body() data: CreateProductDTO){
    return this.productService.create(data);
    
  }
}
