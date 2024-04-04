import { IsInt, IsString } from "class-validator";

export class LoginDTO {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsInt()
  storeId: number
}

export class ValidDTO{
  @IsString()
  username: string;

  @IsString()
  password: string;
}