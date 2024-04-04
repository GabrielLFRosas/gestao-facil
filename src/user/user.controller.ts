import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ParamId } from 'src/decorators/param-id.decorator';

import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) {}


  @Post()
  async create(@Body() data: CreateUserDTO){
    return this.userService.create(data)
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Get()
  async listAll(){
    return this.userService.listAll()
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Get(':id')
  async find(@ParamId() id: number){
    return this.userService.listOne(id)
  }

}
