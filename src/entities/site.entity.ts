import { EntityRepository, Repository } from 'typeorm';
import { Keyword } from './keyword.entity';
import { User } from './user.entity';

export class Site {
  id: number;
  url: string;
  user: User;
  keywords: Keyword
}

@EntityRepository(Site)
export class SitesRepository extends Repository<Site> {}