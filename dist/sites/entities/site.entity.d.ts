import { Keyword } from '../../keywords/entities/keyword.entity';
import { Repository } from 'typeorm';
export declare class Site {
    id: number;
    url: string;
    keywords: Keyword[];
}
export declare class SitesRepository extends Repository<Site> {
}
