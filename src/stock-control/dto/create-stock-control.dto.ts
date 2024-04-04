import { IsDecimal, IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { TypeChangeEnum } from "src/enums/type-change.enum";

export class CreateStockControlDTO {
  @IsInt()
  stockId: number;

  @IsInt()
  userId: number;

  @IsOptional()
  @IsInt()
  saleId?: number;

  @IsDecimal({force_decimal: true, decimal_digits: '3'})
  changeAmount: string;

  @IsEnum(TypeChangeEnum)
  typeChange: TypeChangeEnum;

  @IsOptional()
  @IsString()
  comment?: string

}