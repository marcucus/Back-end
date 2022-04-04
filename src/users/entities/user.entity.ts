import { Keyword } from 'src/keywords/entities/keyword.entity';
import { Site } from "src/sites/entities/site.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  EntityRepository,
  Repository,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  firstname:string;

  @Column()
  lastname:string;

  @Column()
  email:string;

  @Column()
  password:string;

}

@EntityRepository(User)
export class UsersRepository extends Repository<User> {}