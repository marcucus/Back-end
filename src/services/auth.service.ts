import { Injectable} from '@nestjs/common';
import { UsersService } from './users.service';
import { Auth, google } from 'googleapis';
import { User } from 'src/entities/user.entity';
import { JwtAuthService } from './jwt.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    private oauthClient: Auth.OAuth2Client;
    private jwtService : JwtAuthService;
    private JwtService = new JwtService({
      secret: process.env.ACCESS_SECRET,
      signOptions: { expiresIn: '7d' },
    });

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
        const newUser = new User();
        newUser.firstname = req.user.firstName;
        newUser.lastname = req.user.lastName;
        newUser.email = req.user.email;
        newUser.picture = req.user.picture;
          if(!(await this.userService.isUserExists(newUser))){
            await this.userService.create(newUser);
          }
        const email:string = req.user.email;
        const user = await this.userService.infoByEmail(email);
        const id:string = user[0].id;
        var loggUser = {
          id : user[0].id,
          email : user[0].email
        };
        const payload:JwtPayload = { sub: loggUser.id, email: loggUser.email };
        const info =  this.JwtService.sign(payload);
        const token = await this.userService.getBearerToken(id,email);
      return token;
      }
    }

}