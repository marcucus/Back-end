import { Keyword } from 'src/keywords/entities/keyword.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  EntityRepository,
  Repository,
  OneToMany,
} from 'typeorm';

@Entity()
export class Site {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @OneToMany(() => Keyword, (keyword) => keyword.site)
  keywords: Keyword[]
}

@EntityRepository(Site)
export class SitesRepository extends Repository<Site> {}
