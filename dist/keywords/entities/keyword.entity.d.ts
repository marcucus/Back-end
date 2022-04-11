import { Site } from "../../sites/entities/site.entity";
import { Repository } from "typeorm";
export declare class Keyword {
    id: number;
    keywords: string;
    position: number;
    lastPosition: number;
    site: Site;
}
export declare class KeywordsRepository extends Repository<Keyword> {
}
