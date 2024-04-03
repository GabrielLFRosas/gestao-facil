import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    if (!(await this.availableNewUser(data.document, data.email))) {
      throw new ConflictException('Usuário já cadastrado');
    }

    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);

    return this.prisma.users.create({
      data: {
        name: data.name,
        document: data.document,
        email: data.email,
        phone: data.phone,
        password: data.password,
        zip: data.zip,
        street: data.street,
        district: data.district,
        state: data.state,
        number: data.number,
        city: data.city,
        isAdmin: data?.isAdmin
      },
      select: {
        id: true,
      },
    });
  }

  async availableNewUser(document: string, email: string) {
    if (
      !(await this.prisma.users.count({
        where: { OR: [{ document }, { email }] },
      }))
    ) {
      return true;
    } else {
      return false;
    }
  }

  async listOne(id: number) {
    return this.prisma.users.findFirst({
      where: {
        id,
      },
    });
  }

  async userExists(id: number) {
    const user = await this.prisma.users.findFirst({ where: { id } });

    if (!user) {
      return false;
    }

    return true;
  }
}
