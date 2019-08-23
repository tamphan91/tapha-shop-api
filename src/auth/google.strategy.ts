import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService, Provider } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor( private readonly authService: AuthService) {
        super({
            clientID: '1021440325019-v4sbsr442rb94jb0gjsopn0av0okbuo6.apps.googleusercontent.com',     // <- Replace this with your client id
            clientSecret: 'Fy1687FdoXH1f201YrYaDy9A', // <- Replace this with your client secret
            callbackURL: process.env.URL + '/google/callback',
            passReqToCallback: true,
            scope: ['profile'],
        });
    }

    // tslint:disable-next-line:ban-types
    async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function) {
        try {
            // tslint:disable-next-line:no-console
            console.log('profile', profile);

            const jwt: string = await this.authService.validateOAuthLogin(profile.id, Provider.GOOGLE);
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
