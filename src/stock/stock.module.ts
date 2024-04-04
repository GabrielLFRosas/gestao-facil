import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';

import { StockController } from './stock.controller';
import { StockService } from './stock.service';

@Module({
  imports: [PrismaModule, UserModule, AuthModule],
  controllers: [StockController],
  providers: [StockService],
  exports: [StockService]
})
export class StockModule {}
