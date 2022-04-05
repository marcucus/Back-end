import { Body, Controller, Delete, Get, HttpException, HttpStatus, Ip, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import RefreshTokenDto from './dto/refresh-token.dto';
import { LoginDto } from './dto/login.dto';
import GoogleTokenDto from './dto/google-token.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req)
  }
/*
  @Post('/google/callback')
  async googleLogin(
    @Body() body: GoogleTokenDto,
    @Req() req,
    @Ip() ip: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const result = await this.authService.loginGoogleUser(body.token, {
      userAgent: req.headers['user-agent'],
      ipAddress: ip,
    });
    if (result) {
      return result;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Error while logging in with google',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('login')
  // we need to create the LoginDto.
  async login(@Req() request, @Ip() ip: string, @Body() body: LoginDto) {
      // geting the useragent and ip address from @Req decorator and @Ip decorater imported at the top.
    return this.authService.login(body.email, body.password, {
      ipAddress: ip,
      userAgent: request.headers['user-agent'],
    });
  }

  @Post('refresh')
  // we need to create RefreshTokenDto
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refresh(body.refreshToken);
  }

  @Delete('logout')
  // we need to create RefreshTokenDto
  async logout(@Body() body: RefreshTokenDto) {
    return this.authService.logout(body.refreshToken);
  }*/
}