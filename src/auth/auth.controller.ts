import { Controller, UseGuards, Post, Body, Logger, Request, Get, Req, Res, NotFoundException, HttpCode, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserDTO } from './login-user.dto';
import { ApiUseTags, ApiExcludeEndpoint, ApiOperation, ApiImplicitBody } from '@nestjs/swagger';
import { Provider } from '../common/constants';
import { RegisterUserDTO } from './register-user.dto';
import { UserService } from '../user/user.service';
import { ProfileService } from '../profile/profile.service';
import { ForgotUserArgs } from './forgot-user-args';
import { MailerService } from '@nest-modules/mailer';
import { ConfigService } from '../config/config.service';

@ApiUseTags('auths')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService, private profileSerive: ProfileService
              , private readonly mailerService: MailerService, private readonly config: ConfigService) {
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() user: LoginUserDTO, @Request() req) {
        Logger.log('controller is logging...');
        return this.authService.login(req.user);
    }

    @Post('register')
    async register(@Body() user: RegisterUserDTO) {
        const profileId = await this.profileSerive.initProfile(user.firstName, user.lastName);
        await this.userService.initUser(user.email, user.password, profileId);
        const userValidated = await this.authService.validateUser(user.email, user.password);
        return this.authService.login(userValidated);
    }

    @Post('forgot')
    @HttpCode(200)
    async forgot(@Body() args: ForgotUserArgs) {
        const user = await this.authService.checkUser(args.email);

        if (!user) {
            throw new NotFoundException(`${args.email} is not existence`);
        }

        const token = (await this.authService.login(user)).access_token;
        await this
            .mailerService
            .sendMail({
                to: args.email,
                subject: 'Reset your tapha-shop password',
                template: 'reset-password', // The `.pug` or `.hbs` extension is appended automatically.
                context: {  // Data to be sent to template engine.
                    url: this.config.clientUrl + '/reset?token=' + token,
                },
            });
        return { message: 'please check your email to reset the password' };
    }

    @HttpCode(200)
    @Post('logout')
    async logout() {
        return { message: 'OK MAN' };
    }

    @ApiOperation({ description: 'Login by google account', title: 'Login by google account, ' + process.env.URL + '/api/auth/google' })
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
            res.redirect(process.env.CLIENT_URL + '/auth/token/' + jwt);
        } else {
            res.redirect(process.env.CLIENT_URL + '/auth/login/failure');
        }
    }
}
