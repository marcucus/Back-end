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

  @Column({ unique: true })
  email:string;

  @Column({ nullable:true })
  firstname:string;

  @Column({ nullable:true })
  lastname:string;

  @Column({ nullable:true })
  picture:string;

}

@EntityRepository(User)
export class UsersRepository extends Repository<User> {}