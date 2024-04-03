import { IsEmail, IsInt, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Match } from "src/decorators/match.decorator";

export class CreateUserDTO {
  
  @IsString()
  name: string;

  @IsString()
  document: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
  })
  password: string;
  
  @Match('password')
  confirmPassword: string;

  @IsString()
  zip: string;

  @IsString()
  street: string;

  @IsString()
  district: string;

  @IsString()
  state: string;
  
  @IsString()
  number: string;

  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  complement: string;

  @IsOptional()
  @IsInt()
  isAdmin?: number;

}