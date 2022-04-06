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
    
    /*find(email: string): Promise<User | undefined> {
        const user = this.usersRepository.find((user:User) => user.email === email)
        if(user){
            return 'defined';
        }
        else{
            return "undefined";
        }
    }*/

    async doesUserExists(email: string){
        const user = await this.usersRepository.findOne({ email: email });
        if(user.email.length != 0){
            return true;
        }
        return false;
    }

    findByMail(email: string){
        const user = getRepository(User)
          .createQueryBuilder("user")
          .where("user.email = :email", { email: email })
          .getOneOrFail();
    
        return user;
      }
    
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
