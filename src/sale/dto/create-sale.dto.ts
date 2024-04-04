import { IsArray, IsDecimal, IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { PaymentMethodEnum } from "src/enums/payment-method.enum";

export class CreateSaleDTO{
  @IsOptional()
  @IsInt()
  clientId?: number;

  @IsDecimal({force_decimal: true, decimal_digits: '2'})
  value: string;

  @IsDecimal({force_decimal: true, decimal_digits: '2'})
  totalValue: string;

  @IsOptional()
  @IsDecimal({force_decimal: true, decimal_digits: '2'})
  discount?: string;

  @IsEnum(PaymentMethodEnum)
  paymentMethod: PaymentMethodEnum;

  @IsString()
  comment: string;

  @IsArray()
  products: ProductsSalesDTO[];
}

export class ProductsSalesDTO{
  @IsInt()
  productId: number;
  
  @IsDecimal({force_decimal: true, decimal_digits: '3'})
  amount: string;

  @IsDecimal({force_decimal: true, decimal_digits: '2'})
  value: string;

  @IsOptional()
  @IsDecimal({force_decimal: true, decimal_digits: '2'})
  discount?: string;

}