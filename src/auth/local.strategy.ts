import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({usernameField : 'email', passwordField: 'password'});
  }

  async validate(email: string, password: string): Promise<any> {
    Logger.log('Local validate');
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    Logger.log(user);
    return user;
  }
}
