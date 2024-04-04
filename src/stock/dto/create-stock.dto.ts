import { IsDecimal, IsEnum, IsInt, IsOptional } from "class-validator";
import { TypeAmountEnum } from "src/enums/type-amount.enum";

export class CreateStockDTO {
  @IsInt()
  productId: number;

  @IsOptional()
  @IsDecimal({force_decimal: true, decimal_digits: '3'})
  amount?: string;

  @IsOptional()
  @IsEnum(TypeAmountEnum)
  typeAmount?: TypeAmountEnum;

}