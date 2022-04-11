import { CreateUserDto } from '../dto/users/create-user.dto';
import { User, UsersRepository } from '../entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: UsersRepository);
    private users;
    create(createUserDto: CreateUserDto): Promise<CreateUserDto & User>;
    findByEmail(email: string): Promise<User | undefined>;
    isUserExists(createUserDto: CreateUserDto): Promise<any>;
    findOne(id: number): Promise<User | undefined>;
}
