import {Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from 'src/dto/users/create-user.dto';
import { JwtAuthService } from 'src/services/jwt.service';

@Controller('authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { }


  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
  }

  
  @Post('auth')
  auth(@Body() token: string,@Req() req) {
    return this.authService.googleLogin(token,req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @Get('/logout')
  logout(@Req() req) {
    req.destroy();
  }

}