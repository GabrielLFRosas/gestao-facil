import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateClientDTO } from './dto/create-client.dto';

@Injectable()
export class ClientService {

  constructor(private readonly prisma: PrismaService){}

  async create(data: CreateClientDTO, storeId: number, userId: number){
    return this.prisma.clients.create({data: {
      ...data,
      storeId,
      createdBy: userId
    }})
  }
}
