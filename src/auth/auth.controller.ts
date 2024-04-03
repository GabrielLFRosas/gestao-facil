import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService){}

  @Post()
  async login(@Body() data: LoginDTO){
    return this.authService.login(data);
  }

}
