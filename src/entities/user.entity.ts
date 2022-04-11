import {
  EntityRepository,
  Repository,
} from 'typeorm';

export class User {
  id:number;
  email:string;
  firstname:string;
  lastname:string;
  picture:string;
}

@EntityRepository(User)
export class UsersRepository extends Repository<User> {}