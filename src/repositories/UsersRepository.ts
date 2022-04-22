import { IUsersRepository } from '../interfaces/IUsersRepository';
import { getManager } from 'typeorm';
import { User } from 'src/entities/user.entity';

export class UsersRepository implements IUsersRepository {
    async findOne(id: string): Promise<User| null> {
      const manager = getManager();
      const response = await manager.query(
        `
          SELECT *
          FROM ranking.users
          WHERE id = $1
          LIMIT 1
        `,
        [id],
      );
  
      return (response[0] as User) || null;
    }

    async find(): Promise<User| null> {
      const manager = getManager();
      const response = await manager.query(
        `
          SELECT *
          FROM ranking.users
        `,
      );
      return (response as User) || null;
    }

  
    async findByEmail(email: string): Promise<User>{
      const manager = getManager();
      const user:User = await manager.query(
        `
          SELECT *
          FROM ranking.users
          WHERE email = '${email}'
        `,
      );
      return user;
    }

    async create(user: User): Promise<User> {
      const manager = getManager();
      await manager
        .createQueryBuilder()
        .insert()
        .into('ranking.users')
        .values(user)
        .orIgnore()
        .execute();
  
      return user;
    }
  }