import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StoreService } from 'src/store/store.service';
import { UserService } from 'src/user/user.service';

import { UserStoreDTO } from './dto/user-store.dto';

@Injectable()
export class UserStoreService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly storeService: StoreService,
  ) {}

  async create(data: UserStoreDTO, storeId: number) {
    try {
      if (
        !this.userService.userExists(data.userId) ||
        !this.storeService.storeExists(storeId)
      ) {
        throw new NotFoundException('Dados inconsistentes!');
      }

      if (!(await this.validToInsert(data, storeId))) {
        return new ConflictException(
          'Este usuário já está associado à esta loja!',
        );
      }

      return this.prisma.user_store.create({
        data: {
          userId: data.userId,
          storeId,
          admin: data.admin ? 1 : 0,
          owner: data?.owner ? 1 : 0,
        },
      });
    } catch (e) {
      return new InternalServerErrorException(e);
    }
  }

  async validToInsert(data: UserStoreDTO, storeId: number) {
    const userStore = await this.prisma.user_store.count({
      where: {
        userId: data.userId,
        storeId,
      },
    });

    if (userStore > 0) {
      return false;
    }

    return true;
  }

  async listUsersByStore(storeId: number) {
    return this.prisma.users.findMany({
      include: {
        user_store: {
          where: {
            storeId,
          },
        },
      },
    });
  }
}
