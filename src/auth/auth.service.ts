import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  private issuerLogin = 'login';
  private issuerForgot = 'forgot';

  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async createToken(user: users) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          document: user.document,
          email: user.email,
          isAdmin: user.isAdmin,
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

    return this.createToken(user);
  }
}
