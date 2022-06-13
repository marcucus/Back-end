import { Controller, Delete, Get, HttpCode, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('info/:token')
  @HttpCode(200)
  info(@Param('token') token:string){
    return this.usersService.info(token);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  @HttpCode(200)
  remove(@Param('id') id:string){
    return this.usersService.delete(id);
  }


}