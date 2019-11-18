import { Controller, UseGuards, Post, Body, Logger, Request, Get, Req, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserDTO } from './login-user.dto';
import { ApiUseTags, ApiExcludeEndpoint, ApiOperation } from '@nestjs/swagger';
import { Provider } from '../common/constants';
import { RegisterUserDTO } from './register-user.dto';
import { UserService } from '../user/user.service';
import { ProfileService } from '../profile/profile.service';

@ApiUseTags('auths')
@Controller()
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService, private profileSerive: ProfileService) {
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() user: LoginUserDTO, @Request() req) {
        Logger.log('controller is logging...');
        return this.authService.login(req.user);
    }

    @Post('register')
    async register(@Body() user: RegisterUserDTO) {
        const profileId = await this.profileSerive.initProfile(user.firstName, user.lastName, user.gender);
        await this.userService.initUser(user.email, user.password, profileId);
        const userValidated = await this.authService.validateUser(user.email, user.password);
        return this.authService.login(userValidated);
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
