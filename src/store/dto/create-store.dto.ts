import { IsOptional, IsString } from "class-validator";

export class CreateStoreDTO{
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  document: string;

  @IsString()
  zip: string;

  @IsString()
  street: string;

  @IsString()
  district: string;

  @IsString()
  number: string;
  
  @IsOptional()
  @IsString()
  complement?: string;
  
  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsOptional()
  @IsString()
  primaryColor?: string;

  @IsOptional()
  @IsString()
  secondaryColor?: string;


  
}