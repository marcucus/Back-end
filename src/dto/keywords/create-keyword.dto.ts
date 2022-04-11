import { Site } from "../../entities/site.entity";

export class CreateKeywordDto {
    id:number;
    keywords: string;
    position: number;
    lastPosition: number;
    site:Site;
}
