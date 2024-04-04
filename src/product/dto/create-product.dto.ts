import { IsBoolean, IsDecimal, IsEnum, IsInt, IsNumber, IsOptional, IsString } from "class-validator";
import { TypeAmountEnum } from "src/enums/type-amount.enum";

export class CreateProductDTO{

  @IsInt()
  categoryId: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDecimal({force_decimal: true, decimal_digits: '2'})
  costPrice: string;

  @IsDecimal({force_decimal: true, decimal_digits: '2'})
  price: string;

  @IsBoolean()
  ativo: boolean;

  @IsOptional()
  @IsEnum(TypeAmountEnum)
  typeAmount?: TypeAmountEnum;

}