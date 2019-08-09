import { Controller, UseGuards, Post, Body, Logger, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDTO } from '../user/user.dto';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('auths')
@Controller()
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() userDTO: UserDTO, @Request() req) {
      Logger.log('controller is logging...');
      return this.authService.login(req.user);
    }
}
