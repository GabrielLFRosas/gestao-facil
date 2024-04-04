import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { StoreAdminGuard } from 'src/auth/guards/store-admin.guard';
import { Store } from 'src/decorators/store.decorator';

import { CreateProductDTO } from './dto/create-product.dto';
import { ProductService } from './product.service';

@UseGuards(StoreAdminGuard)
@Controller('products')
export class ProductController {

  constructor(private readonly productService: ProductService){}

  @Post()
  async create(@Body() data: CreateProductDTO, @Store() storeId: number){
    return this.productService.create(data, storeId);
    
  }
}
