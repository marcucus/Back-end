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

  @Column({ unique: true })
  email:string;

  @Column()
  password:string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  updatedAt: Date;

}

@EntityRepository(User)
export class UsersRepository extends Repository<User> {}