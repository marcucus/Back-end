import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../entities/user.entity';
import { JwtStrategy } from './guards/jwt.strategy';

@Injectable()
export class JwtAuthService {
  constructor(private jwtStrategy: JwtStrategy) {}

  login(user) {
    const payload: JwtPayload = { id: user.id, email: user.email};
    return {
      accessToken: this.jwtStrategy.validate(payload),
    };
  }
}