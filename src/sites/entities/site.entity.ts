import { Keyword } from 'src/keywords/entities/keyword.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  EntityRepository,
  Repository,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Site {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @OneToMany(() => Keyword, (keyword) => keyword.site)
  keywords: Keyword[];
}

@EntityRepository(Site)
export class SitesRepository extends Repository<Site> {}
