import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';

import { CreateStoreDTO } from './create-store.dto';

export class UpdateStoreDTO extends PartialType(CreateStoreDTO) {}
