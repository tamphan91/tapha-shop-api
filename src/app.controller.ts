import { Controller, Request, Post, UseGuards, Get, Body, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from './users/user.model';
// import { CreateUserDto } from './users/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() user: User) {
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
