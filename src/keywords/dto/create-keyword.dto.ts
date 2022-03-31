import { Site } from "src/sites/entities/site.entity";

export class CreateKeywordDto {
    id:number;
    keywords: string;
    position: number;
    lastPosition: number;
    site:Site;
}
