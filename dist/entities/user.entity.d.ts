import { Repository } from 'typeorm';
export declare class User {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    picture: string;
}
export declare class UsersRepository extends Repository<User> {
}
