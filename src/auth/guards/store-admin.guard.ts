import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserStoreService } from 'src/user-store/user-store.service';
import { UserService } from 'src/user/user.service';

import { AuthService } from '../auth.service';

@Injectable()
export class StoreAdminGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const data = await this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      );

      const userStore = await this.prisma.user_store.findFirst({
        where: {userId: data.id, admin: 1}
      })
      if(!userStore){
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }
}
