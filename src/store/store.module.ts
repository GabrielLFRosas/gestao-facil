import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';

import { StoreController } from './store.controller';
import { StoreService } from './store.service';

@Module({
  imports: [PrismaModule, UserModule, forwardRef(() => AuthModule)],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService],
})
export class StoreModule {}
