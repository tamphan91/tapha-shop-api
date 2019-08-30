import { Controller, UseGuards, Post, Body, Logger, Request, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserDTO } from '../user/login-user.dto';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('auths')
@Controller()
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() user: LoginUserDTO, @Request() req) {
      Logger.log('controller is logging...');
      return this.authService.login(req.user);
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleLogin() {
        // initiates the Google OAuth2 login flow
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleLoginCallback(@Req() req, @Res() res) {
        // handles the Google OAuth2 callback
        const jwt: string = req.user.jwt;
        if (jwt) {
            res.redirect('http://localhost:4200/login/succes/' + jwt);
            // tslint:disable-next-line:no-console
            console.log(jwt);
        } else {
            res.redirect('http://localhost:4200/login/failure');
        }
    }
}
