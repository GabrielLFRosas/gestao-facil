import { IsDateString, IsEmail, IsOptional, IsString } from "class-validator";

export class CreateClientDTO{

  @IsString()
  name: string;

  @IsString()
  document: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsDateString()
  birthdate: string;

  @IsString()
  zip: string;

  @IsString()
  street: string;

  @IsString()
  number: string;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsString()
  district: string;

  @IsString()
  city: string;

  @IsString()
  state: string;
}