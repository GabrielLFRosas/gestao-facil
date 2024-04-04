import { IsBoolean, IsInt } from "class-validator";

export class UserStoreDTO{
  @IsInt()
  userId: number;

  @IsInt()
  storeId: number;

  @IsBoolean()
  admin: boolean;

  @IsBoolean()
  owner: boolean;
}