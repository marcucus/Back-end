import { Repository } from 'typeorm';
import { Keyword } from './keyword.entity';
import { User } from './user.entity';
export declare class Site {
    id: number;
    url: string;
    user: User;
    keywords: Keyword;
}
export declare class SitesRepository extends Repository<Site> {
}
