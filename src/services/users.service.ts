import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/users/create-user.dto';
import { User } from '../entities/user.entity';
import { UsersRepository } from 'src/repositories/UsersRepository';

@Injectable()
export class UsersService {
    constructor(
        private usersRepository: UsersRepository
    ) { }
    
    private users:User[] = [];

    create(createUserDto: CreateUserDto) {
        return this.usersRepository.create(createUserDto);
    }
    
    findByEmail(email:string): Promise<User | undefined> {
        const user = this.users.find((user:User) => user.email === email)
        if(user){
            return Promise.resolve(user)
        }
        return undefined;
    }

    async isUserExists(createUserDto: CreateUserDto): Promise<any> {
        const { email } = createUserDto;
        const user = await this.findByEmail( email );
        if (user) return true;
        else return false;
      }

    findOne(id: number): Promise<User | undefined> {
        const user = this.users.find((user) => user.id === id);
        if (user) {
          return Promise.resolve(user);
        }
        return undefined;
      }
}
