import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StoreModule } from 'src/store/store.module';
import { UserModule } from 'src/user/user.module';

import { UserStoreController } from './user-store.controller';
import { UserStoreService } from './user-store.service';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    StoreModule,
  ],
  controllers: [UserStoreController],
  providers: [UserStoreService],
})
export class UserStoreModule {}
