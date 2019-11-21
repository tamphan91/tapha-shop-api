import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from './auth.service';
import { Provider } from '../common/constants';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, Provider.GOOGLE) {

    constructor(private readonly authService: AuthService) {
        super({
            clientID: '728660161825-4m6clvpn88hu4mhmdl5cdrnb2sqp0jdt.apps.googleusercontent.com',     // <- Replace this with your client id
            clientSecret: 'Sss1ocPkON7U1wpv-rSZ3JPw', // <- Replace this with your client secret
            callbackURL: process.env.URL + '/api/auth/google/callback',
            passReqToCallback: true,
            scope: ['profile'],
        });
    }

    // tslint:disable-next-line:ban-types
    async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function) {
        try {
            // tslint:disable-next-line:no-console
            // console.log(profile);
            const jwt: string = await this.authService.validateOAuthLogin(profile.id, Provider.GOOGLE, profile._json);
            const user = {
                jwt,
            };
            done(null, user);
        } catch (err) {
            // console.log(err)
            done(err, false);
        }
    }

}
