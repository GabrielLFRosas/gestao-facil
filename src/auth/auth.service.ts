import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { StoreService } from 'src/store/store.service';
import { UserStoreModule } from 'src/user-store/user-store.module';
import { UserStoreService } from 'src/user-store/user-store.service';

import { LoginDTO, ValidDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  private issuerLogin = 'login';
  private issuerForgot = 'forgot';

  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async createToken(user: users, storeId: number) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          document: user.document,
          email: user.email,
          isAdmin: user.isAdmin,
          storeId
        },
        {
          expiresIn: '30 days',
          subject: String(user.id),
          issuer: this.issuerLogin,
          audience: 'users',
        },
      ),
    };
  }

  async checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuerLogin,
        audience: 'users',
      });
      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  async login(data: LoginDTO) {
    const user = await this.prismaService.users.findFirst({
      where: {
        document: data.username,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (!(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Dados incorretos!');
    }

    return this.createToken(user, data.storeId);
  }

  async valid(data: ValidDTO) {
    const user = await this.prismaService.users.findFirst({
      where: {
        document: data.username,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (!(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Dados incorretos!');
    }

    return this.getUserStores(user.id);
  }

  async getUserStores(userId: number) {
    const userStores = await this.prismaService.user_store.findMany({
      where: {
        userId: userId,
      },
      include: {
        stores: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    

    return userStores.map((userStore) => userStore.stores);
  }
}
