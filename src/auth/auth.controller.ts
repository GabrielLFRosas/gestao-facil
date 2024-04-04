import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDTO, ValidDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService){}

  @Post()
  async login(@Body() data: LoginDTO){
    return this.authService.login(data);
  }

  @Post('valid')
  async valid(@Body() data: ValidDTO){
    return this.authService.valid(data);
  }

}
