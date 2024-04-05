import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ParamId } from 'src/decorators/param-id.decorator';

import { CreateStoreDTO } from './dto/create-store.dto';
import { UpdateStoreDTO } from './dto/update-store.dto';
import { StoreService } from './store.service';

@UseGuards(AuthGuard)
@Controller('stores')
export class StoreController {

  constructor(private readonly storeService: StoreService){}

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() data: CreateStoreDTO){
    return this.storeService.create(data)
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(@Body() data: UpdateStoreDTO, @ParamId() id: number){
    return this.storeService.update(data ,id)
  }
}
