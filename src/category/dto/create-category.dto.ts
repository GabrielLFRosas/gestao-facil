import { IsBoolean, IsInt, IsString } from "class-validator";

export class CreateCategoryDTO {

  @IsInt()
  storeId: number;

  @IsString()
  name: string;

  @IsBoolean()
  ativo: boolean;
}