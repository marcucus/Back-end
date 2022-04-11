import { Injectable, Redirect } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Auth, google } from 'googleapis';
import { CreateUserDto } from '../dto/users/create-user.dto';
import { JwtStrategy } from './guards/jwt.strategy';
import { JwtPayload } from 'jsonwebtoken';
import { JwtAuthService } from './jwt.service';

@Injectable()
export class AuthService {
    private oauthClient: Auth.OAuth2Client;
    private jwtService: JwtAuthService;
    private jwtStrategy: JwtStrategy;

    constructor(public userService: UsersService) {
      const clientId = process.env.GOOGLE_CLIENT_ID;
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
      this.oauthClient = new google.auth.OAuth2(clientId, clientSecret);
    }

    async googleLogin(req) {
      if (!req.user){
        return 'No user from google'
      }
      if (req.user){
        const newUser = new CreateUserDto();
        newUser.firstname = req.user.firstName;
        newUser.lastname = req.user.lastName;
        newUser.email = req.user.email;
        newUser.picture = req.user.picture;
          if(!(await this.userService.isUserExists(newUser))){
            await this.userService.create(newUser);
          }
      return {
        message: 'User Info from Google',
        user: req.user,
        }
      }
    }

}