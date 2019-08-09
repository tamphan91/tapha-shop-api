import { Controller, UseGuards, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/user.entity';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('auths')
@Controller()
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() user: User) {
      return this.authService.login(user);
    }
}
