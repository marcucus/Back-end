import { User } from "src/entities/user.entity";

export interface IUsersRepository {
    findOne(id: string): Promise<User | null>;
    create(user: User): Promise<User>;
    findByEmail(email:string): Promise<User>;
    find(): Promise<User| null>;
  }