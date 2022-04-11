import { Site } from "../../entities/site.entity";
export declare class CreateKeywordDto {
    id: number;
    keywords: string;
    position: number;
    lastPosition: number;
    site: Site;
}
