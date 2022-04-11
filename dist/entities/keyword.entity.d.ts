import { Repository } from 'typeorm';
import { Site } from './site.entity';
export declare class Keyword {
    id: number;
    keywords: string;
    position: number;
    lastPosition: number;
    site: Site;
}
export declare class KeywordsRepository extends Repository<Keyword> {
}
