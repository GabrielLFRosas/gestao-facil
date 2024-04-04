import { IsBoolean, IsInt } from "class-validator";

export class UserStoreDTO{
  @IsInt()
  userId: number;

  @IsBoolean()
  admin: boolean;

  @IsBoolean()
  owner: boolean;
}