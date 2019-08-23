import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { sign } from 'jsonwebtoken';
import { jwtConstants } from '../common/constants';

export enum Provider {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY = jwtConstants.secret; // <- replace this with your secret key
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    Logger.log('auth validate');
    const user = await this.userService.findOne({ email: username });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    Logger.log('service is logging...');
    // const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(user),
    };
  }

  async validateOAuthLogin(thirdPartyId: string, provider: Provider): Promise<string> {
    try {
      // You can add some registration logic here,
      // to register the user using their thirdPartyId (in this case their googleId)
      // let user: IUser = await this.usersService.findOneByThirdPartyId(thirdPartyId, provider);

      // if (!user)
      // user = await this.usersService.registerOAuthUser(thirdPartyId, provider);

      const payload = {
        thirdPartyId,
        provider,
      };

      const jwt: string = sign(payload, this.JWT_SECRET_KEY, { expiresIn: 3600 });
      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }
}
