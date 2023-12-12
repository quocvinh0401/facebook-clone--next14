import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Payload } from './payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('security.jwt.secret'),
    });
  }

  async validate(payload: Payload, done: VerifiedCallback): Promise<any> {
    return done(null, payload);
  }
}
