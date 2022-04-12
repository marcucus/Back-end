import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dto/users/create-user.dto';
import { User } from 'src/entities/user.entity';
import { IUsersRepository } from 'src/interfaces/IUsersRepository';
import { UsersRepository } from 'src/repositories/UsersRepository';
import { UsersService } from 'src/services/users.service';

@Injectable()
export class AuthUseCase {
  userService: UsersService;
  constructor(
    @Inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

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