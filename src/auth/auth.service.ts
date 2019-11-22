import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import {  Gender, Provider } from '../common/constants';
import { GoogleService } from '../google/google.service';
import { ProfileService } from '../profile/profile.service';
import { Profile } from '../profile/profile.entity';
import { Google } from '../google/google.entity';
import { getRepository } from 'typeorm';

// export enum Provider {
//   GOOGLE = 'google',
//   FACEBOOK = 'facebook',
// }

@Injectable()
export class AuthService {
  // private readonly JWT_SECRET_KEY = jwtConstants.secret; // <- replace this with your secret key
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly googleService: GoogleService,
    private readonly profileService: ProfileService,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    Logger.log('auth validate');
    const user = await this.userService.findAll({ select: ['id', 'email', 'password'], where: { email }, relations: ['profile'] });
    // tslint:disable-next-line:no-console
    // console.log(user[0]);
    // const user = await this.userService.findOne({ email: username });
    if (user[0] && user[0].password === pass) {
      const { password, ...result } = user[0];
      // const { Other, ...result1 } = Gender;
      return result;
    }
    return null;
  }

  async checkUser(email: string): Promise<any> {
    Logger.log('auth validate');
    const user = await this.userService.findAll({ select: ['id', 'email', 'password'], where: { email }, relations: ['profile'] });
    if (user[0]) {
      const { password, ...result } = user[0];
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

  async checkToken(token: string) {
    let decode;
    try {
      await this.jwtService.verifyAsync(token);
    } catch (err) {
      if ( err.message === 'jwt expired') {
        decode = this.jwtService.decode(token);
        const exp = decode.exp;
        const now = (new Date().getTime() / 1000);
        const expiredMinutes = (now - exp) / 60;
        if (expiredMinutes <= 5) { // refresh token condition < 30minutes
          delete decode.iat;
          delete decode.exp;
        } else {
          decode = null;
        }
      }
    }
    return decode;
  }

  async validateOAuthLogin(thirdPartyId: string, provider: Provider, profile): Promise<string> {
    try {
      // You can add some registration logic here,
      // to register the user using their thirdPartyId (in this case their googleId)
      // let user: IUser = await this.usersService.findOneByThirdPartyId(thirdPartyId, provider);
      // tslint:disable-next-line:no-console
      // console.log('thirdPartyId', thirdPartyId);
      // tslint:disable-next-line:no-console
      // console.log('profile', profile);
      const google = await this.googleService.findOne({ thirdPartyId });

      const payload = {
        thirdPartyId,
        provider,
        profile,
      };

      if (!google) {
        const profileRepository = getRepository(Profile);
        const googleRepository = getRepository(Google);
        const userProfile = new Profile();
        userProfile.firstName = profile.given_name;
        userProfile.lastName = profile.family_name;
        userProfile.photo = profile.picture;
        userProfile.gender = Gender.Other;
        const userProfileReturn = await profileRepository.save(userProfile);
        const googleAccount = new Google();
        googleAccount.profileId = userProfileReturn.id;
        googleAccount.thirdPartyId = thirdPartyId;
        await googleRepository.save(googleAccount);
        payload.profile = userProfileReturn;
      } else {
        const userProfileReturn = await this.profileService.findOne(google.profileId);
        payload.profile = userProfileReturn;
      }
      // // tslint:disable-next-line:no-console
      // console.log('payload', payload);
      // const jwt: string = sign(payload, this.JWT_SECRET_KEY, { expiresIn: 3600 });
      const jwt: string = this.jwtService.sign(payload);
      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }
}
