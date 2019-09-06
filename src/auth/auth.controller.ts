import { Controller, UseGuards, Post, Body, Logger, Request, Get, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserDTO } from '../user/login-user.dto';
import { ApiUseTags, ApiOAuth2Auth, ApiExcludeEndpoint, ApiOperation } from '@nestjs/swagger';
import { Provider } from '../common/constants';

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

    @ApiOperation({ description: 'Login by google account', title: 'Login by google account, ' + process.env.URL + '/google'})
    @Get('google')
    @UseGuards(AuthGuard(Provider.GOOGLE))
    googleLogin(@Res() res) {
        // initiates the Google OAuth2 login flow
    }

    @ApiExcludeEndpoint()
    @Get('google/callback')
    @UseGuards(AuthGuard(Provider.GOOGLE))
    googleLoginCallback(@Req() req, @Res() res) {
        // handles the Google OAuth2 callback
        const jwt: string = req.user.jwt;
        if (jwt) {
            res.redirect(process.env.CLIENT_URL + '/login/success/' + jwt);
        } else {
            res.redirect(process.env.CLIENT_URL + '/login/failure');
        }
    }
}
