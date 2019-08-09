import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    Logger.log('auth validate');
    const user = await this.userService.findOne({email: username});
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
}
