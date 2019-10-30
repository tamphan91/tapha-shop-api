import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { jwtConstants } from '../common/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
    // Logger.log('ExtractJwt.fromAuthHeaderAsBearerToken()');
  }

  async validate(payload: any) {
    Logger.log('jwt validate');
    // // tslint:disable-next-line:no-console
    // console.log(payload);
    return { payload }; // added payload to @Request() req -> req.user
  }
}
