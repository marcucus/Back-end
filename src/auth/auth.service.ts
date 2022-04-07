import { Injectable, Redirect } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import RefreshToken from './entities/refresh-token.entity';
import { Auth, google } from 'googleapis';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
    private refreshTokens: RefreshToken[]= [];
    private oauthClient: Auth.OAuth2Client;

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
        const exist = await this.userService.findByEmail(req.user.email);
        if(!exist){
          const newUser = new CreateUserDto();
          newUser.firstname = req.user.firstName;
          newUser.lastname = req.user.lastName;
          newUser.email = req.user.email;
          newUser.picture = req.user.picture;
          await this.userService.create(newUser);
          console.log(exist);
        }
      return {
        message: 'User Info from Google',
        user: req.user,
        }
      }
    }

}