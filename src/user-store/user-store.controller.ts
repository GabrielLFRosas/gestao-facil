import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { StoreAdminGuard } from 'src/auth/guards/store-admin.guard';

import { UserStoreDTO } from './dto/user-store.dto';
import { UserStoreService } from './user-store.service';

@UseGuards(AuthGuard, StoreAdminGuard)
@Controller('user-store')
export class UserStoreController {
  constructor(private readonly userStoreService: UserStoreService) {}

  @Post()
  async create(@Body() data: UserStoreDTO) {
    return this.userStoreService.create(data);
  }
}
