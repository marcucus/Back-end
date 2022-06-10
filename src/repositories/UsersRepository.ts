import { IUsersRepository } from '../interfaces/IUsersRepository';
import { getManager } from 'typeorm';
import { User } from '../entities/user.entity';
import { KeywordsRepository } from './KeywordsRepository';
import { JwtService } from '@nestjs/jwt';

export class UsersRepository implements IUsersRepository {
  public JwtService = new JwtService({
    secret: process.env.ACCESS_SECRET,
    signOptions: { expiresIn: '7d' },
  });
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

    async info(token:string){
      var decoded = this.JwtService.decode(token);
      var id = decoded.sub;
      const manager = getManager();
      const response = await manager.query(
        `
        SELECT *
        FROM ranking.users
        WHERE "id" = '${id}'
        `
      );
      return response
    }

    async delete(id:string){
      const manager = getManager();
      const response = await manager.query(
        `
        DELETE FROM ranking.users
        WHERE "id" =  '${id}'
        `
      );
      return response;
    }
  }