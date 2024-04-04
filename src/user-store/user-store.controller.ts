import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { StoreAdminGuard } from 'src/auth/guards/store-admin.guard';
import { Store } from 'src/decorators/store.decorator';

import { UserStoreDTO } from './dto/user-store.dto';
import { UserStoreService } from './user-store.service';

@UseGuards(AuthGuard)
@Controller('user-store')
export class UserStoreController {
  constructor(private readonly userStoreService: UserStoreService) {}

  @Post()
  async create(@Body() data: UserStoreDTO, @Store() storeId: number) {
    return this.userStoreService.create(data, storeId);
  }

  @UseGuards(StoreAdminGuard)
  @Get()
  async listUsersByStore(@Store() storeId: number){
    return this.userStoreService.listUsersByStore(storeId);
  }
}
