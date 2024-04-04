import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';

import { StockControlController } from './stock-control.controller';
import { StockControlService } from './stock-control.service';

@Module({
  imports: [PrismaModule, UserModule, AuthModule],
  controllers: [StockControlController],
  providers: [StockControlService],
  exports: [StockControlService]
})
export class StockControlModule {}
