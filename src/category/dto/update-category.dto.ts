import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";

import { CreateCategoryDTO } from "./create-category.dto";

export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO) {}