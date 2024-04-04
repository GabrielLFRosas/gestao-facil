import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { users } from '@prisma/client';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Store } from 'src/decorators/store.decorator';
import { User } from 'src/decorators/user.decorator';

import { ClientService } from './client.service';
import { CreateClientDTO } from './dto/create-client.dto';

@UseGuards(AuthGuard)
@Controller('clients')
export class ClientController {

  constructor(private readonly clientService: ClientService){}

  @Post()
  async create(@Body() data: CreateClientDTO, @Store() storeId: number, @User() user: users){
    return this.clientService.create(data, storeId, user.id)
  }
}
