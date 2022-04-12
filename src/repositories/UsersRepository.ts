import { IUsersRepository } from '../interfaces/IUsersRepository';
import { getManager } from 'typeorm';
import { User } from 'src/entities/user.entity';

export class UsersRepository implements IUsersRepository {
    async findOne(id: string): Promise<User| null> {
      const manager = getManager();
      const response = await manager.query(
        `
          SELECT *
          FROM user
          WHERE id = $1
          LIMIT 1
        `,
        [id],
      );
  
      return (response[0] as User) || null;
    }
  
    async create(user: User): Promise<User> {
      const manager = getManager();
      await manager
        .createQueryBuilder()
        .insert()
        .into('user')
        .values(user)
        .orIgnore()
        .execute();
  
      return user;
    }
  }