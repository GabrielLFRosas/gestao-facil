import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { StockControlModule } from './stock-control/stock-control.module';
import { StockModule } from './stock/stock.module';
import { StoreModule } from './store/store.module';
import { UserStoreModule } from './user-store/user-store.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => StoreModule),
    forwardRef(() => UserStoreModule),
    CategoryModule,
    ProductModule,
    StockModule,
    StockControlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
