import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";

export class CreateCategoryDTO {

  @IsString()
  name: string;

  @IsBoolean()
  ativo: boolean;
}