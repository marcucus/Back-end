import { Injectable, Redirect } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import RefreshToken from './entities/refresh-token.entity';
import { sign, verify } from 'jsonwebtoken';
import { Auth, google } from 'googleapis';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { IsNull } from 'typeorm';

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
        const email = req.user.email;
        const exist = await this.userService.findByEmail(email);
        if(exist){
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

    hello() {
      return "Hello"
    }

    async loginGoogleUser(
      token:string,
      values: { userAgent: string; ipAddress: string },
    ):Promise<{accessToken: string; refreshToken:string} | undefined>{
      const tokenInfo = await this.oauthClient.getTokenInfo(token);
      const user = await this.userService.findByEmail(tokenInfo.email);
      if(user){
        return this.newRefreshAndAccessToken(user,values)
      }
      return undefined;
    }

    async refresh(refreshStr: string): Promise<string | undefined> {
        // need to create this helper function.
       const refreshToken = await this.retrieveRefreshToken(refreshStr);
       if (!refreshToken) {
         return undefined;
        }
    
       const user = await this.userService.findOne(refreshToken.userId);
       if (!user) {
         return undefined;
        }
    
       const accessToken = {
         userId: refreshToken.userId,
        };
    
       // sign is imported from jsonwebtoken like import { sign, verify } from 'jsonwebtoken';
       return sign(accessToken, process.env.ACCESS_SECRET, { expiresIn: '1h' });
     }

     private retrieveRefreshToken(
        refreshStr: string,
      ): Promise<RefreshToken | undefined> {
        try {
          // verify is imported from jsonwebtoken like import { sign, verify } from 'jsonwebtoken';
          const decoded = verify(refreshStr, process.env.REFRESH_SECRET);
          if (typeof decoded === 'string') {
            return undefined;
          }
          return Promise.resolve(
            this.refreshTokens.find((token) => token.id === decoded.id),
          );
        } catch (e) {
          return undefined;
        }
      }

    async login(
        email: string,
        values: { userAgent: string; ipAddress: string },
      ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
        const user = await this.userService.findByEmail(email);
        return this.newRefreshAndAccessToken(user, values);
      }

      private async newRefreshAndAccessToken(
        user: User,
        values: { userAgent: string; ipAddress: string },
      ): Promise<{ accessToken: string; refreshToken: string }> {
        const refreshObject = new RefreshToken({
          id:
            this.refreshTokens.length === 0
              ? 0
              : this.refreshTokens[this.refreshTokens.length - 1].id + 1,
          ...values,
          userId: user.id,
        });
        // add refreshObject to your db in real app
        this.refreshTokens.push(refreshObject);
    
        return {
          refreshToken: refreshObject.sign(),
        // sign is imported from jsonwebtoken like import { sign, verify } from 'jsonwebtoken';
          accessToken: sign(
            {
              userId: user.id,
            },
            process.env.ACCESS_SECRET,
            {
              expiresIn: '1h',
            },
          ),
        };

      }
      
      async logout(refreshStr): Promise<void> {
            const refreshToken = await this.retrieveRefreshToken(refreshStr);
        
            if (!refreshToken) {
              return;
            }
            // delete refreshtoken from db
            this.refreshTokens = this.refreshTokens.filter(
              (refreshToken) => refreshToken.id !== refreshToken.id,
            );
          }
}
