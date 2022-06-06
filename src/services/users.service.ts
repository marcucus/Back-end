import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/users/create-user.dto';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../repositories/UsersRepository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        private usersRepository: UsersRepository,
    ) { }
    
    private users:User[] = [];
    private jwtService = new JwtService({
        secret: process.env.ACCESS_SECRET,
        signOptions: { expiresIn: '7d' },
      });

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

    infoByEmail(email:string){
        return this.usersRepository.findByEmail(email);;
    }

    async getBearerToken(id: string, email:string) {
        const payload = { sub: id, email: email };
        return this.jwtService.sign(payload);
    }

    async isUserExists(createUserDto: CreateUserDto): Promise<any> {
        const { email } = createUserDto;
        const user = await this.findByEmail( email );
        if (user) return true;
        else return false;
      }

    findOne(id: string): Promise<User | undefined> {
        const user = this.users.find((user) => user.id === id);
        if (user) {
          return Promise.resolve(user);
        }
        return undefined;
      }
}
