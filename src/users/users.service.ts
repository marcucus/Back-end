import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    private users:User[] = [
        {
        id:0,
        firstname:'Adrien',
        lastname:'marques',
        email:'marqueslaw19@gmail.com',
        password:'marques77'
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
