import { EntityRepository, Repository } from 'typeorm';
import {Site} from './site.entity';
export class Keyword {
    id: number;
    keywords: string;
    position: number;
    lastPosition: number;
    site: Site;
}

@EntityRepository(Keyword)
export class KeywordsRepository extends Repository<Keyword> {}