import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';
import { JwtStrategy } from '../auth/guards/jwt.strategy';

@Injectable()
export class JwtAuthService {
  constructor(private jwtStrategy: JwtStrategy) {}

  login(loggUser: any) {
    const payload: JwtPayload = { id: loggUser.id, email: loggUser.email };
    return {
      accessToken: this.jwtStrategy.validate(payload),
    };
  }
}