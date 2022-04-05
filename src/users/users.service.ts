import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) { }
    
    private users:User[] = [
        {
        id:0,
        firstname:'Adrien',
        lastname:'marques',
        email:'marqueslaw19@gmail.com',
        password:'marques77',
        createdAt:null,
        updatedAt:null
    }
    ];
    
    findByEmail(email:string): Promise<User | undefined> {
        const user = this.users.find((user:User) => user.email === email)
        if(user){
            return Promise.resolve(user)
        }
        return undefined;
    }

    findOne(id: number): Promise<User | undefined> {
        const user = this.users.find((user) => user.id === id);
        if (user) {
          return Promise.resolve(user);
        }
        return undefined;
      }
}
