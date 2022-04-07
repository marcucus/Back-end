import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) { }
    
    private users:User[] = [];

    create(createUserDto: CreateUserDto) {
        return this.usersRepository.save(createUserDto);
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
        const user = await this.usersRepository.findOne({ email });
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
