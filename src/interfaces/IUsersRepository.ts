import { CreateUserDto } from "src/dto/users/create-user.dto";
import { User } from "src/entities/user.entity";

export interface IUsersRepository {
    findOne(id: string): Promise<User | null>;
    create(user: User): Promise<User>;
  }